"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type FontScale = 100 | 112 | 125 | 150;
export type ContrastMode = "normal" | "high";

type AccessibilityPrefs = {
  fontScale: FontScale;
  contrast: ContrastMode;
  underlineLinks: boolean;
  readableFont: boolean;
};

type AccessibilityContextValue = AccessibilityPrefs & {
  setFontScale: (scale: FontScale) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  setContrast: (mode: ContrastMode) => void;
  toggleContrast: () => void;
  setUnderlineLinks: (value: boolean) => void;
  setReadableFont: (value: boolean) => void;
  reset: () => void;
};

const STORAGE_KEY = "guajiru-a11y";
const FONT_STEPS: FontScale[] = [100, 112, 125, 150];

const DEFAULT_PREFS: AccessibilityPrefs = {
  fontScale: 100,
  contrast: "normal",
  underlineLinks: false,
  readableFont: false,
};

const listeners = new Set<() => void>();
let prefsCache: AccessibilityPrefs = DEFAULT_PREFS;
let hydrated = false;

function applyPrefs(prefs: AccessibilityPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.fontScale = String(prefs.fontScale);
  root.dataset.contrast = prefs.contrast;
  root.dataset.underlineLinks = prefs.underlineLinks ? "true" : "false";
  root.dataset.readableFont = prefs.readableFont ? "true" : "false";
  root.style.setProperty("--a11y-font-scale", `${prefs.fontScale / 100}`);
}

function readStoredPrefs(): AccessibilityPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<AccessibilityPrefs>;
    const fontScale = FONT_STEPS.includes(parsed.fontScale as FontScale)
      ? (parsed.fontScale as FontScale)
      : DEFAULT_PREFS.fontScale;
    return {
      fontScale,
      contrast: parsed.contrast === "high" ? "high" : "normal",
      underlineLinks: Boolean(parsed.underlineLinks),
      readableFont: Boolean(parsed.readableFont),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function writePrefs(next: AccessibilityPrefs) {
  prefsCache = next;
  applyPrefs(next);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota / private mode
  }
  emit();
}

function getClientSnapshot() {
  return prefsCache;
}

function getServerSnapshot() {
  return DEFAULT_PREFS;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const prefs = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    const stored = readStoredPrefs();
    prefsCache = stored;
    applyPrefs(stored);
    emit();
  }, []);

  const update = useCallback((partial: Partial<AccessibilityPrefs>) => {
    writePrefs({ ...prefsCache, ...partial });
  }, []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...prefs,
      setFontScale: (fontScale) => update({ fontScale }),
      increaseFont: () => {
        const index = FONT_STEPS.indexOf(prefsCache.fontScale);
        const next = FONT_STEPS[Math.min(FONT_STEPS.length - 1, index + 1)] ?? prefsCache.fontScale;
        update({ fontScale: next });
      },
      decreaseFont: () => {
        const index = FONT_STEPS.indexOf(prefsCache.fontScale);
        const next = FONT_STEPS[Math.max(0, index - 1)] ?? prefsCache.fontScale;
        update({ fontScale: next });
      },
      setContrast: (contrast) => update({ contrast }),
      toggleContrast: () => {
        update({ contrast: prefsCache.contrast === "high" ? "normal" : "high" });
      },
      setUnderlineLinks: (underlineLinks) => update({ underlineLinks }),
      setReadableFont: (readableFont) => update({ readableFont }),
      reset: () => writePrefs(DEFAULT_PREFS),
    }),
    [prefs, update],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
