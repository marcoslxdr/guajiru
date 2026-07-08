"use client";

import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

type RichTextEditorProps = {
  name: string;
  initialContent?: string | null;
};

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-2 py-1 text-sm font-medium ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ name, initialContent }: RichTextEditorProps) {
  const [html, setHtml] = useState(initialContent ?? "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content: initialContent ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      setHtml(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-48 rounded-b-xl border border-t-0 border-border bg-surface px-4 py-3 focus:outline-none prose-content",
      },
    },
  });

  if (!editor) {
    return <div className="min-h-48 rounded-xl border border-border bg-muted" />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-t-xl border border-border bg-muted/50 p-2">
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          N
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • Lista
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. Lista
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("URL do link", previousUrl ?? "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        >
          Link
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>Desfazer</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>Refazer</ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
