import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(["Geral", "Parceria", "Imprensa", "Outro"]),
  message: z.string().min(10),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(),
});

export const associacaoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  modality: z.enum(["Remo", "Outro esporte", "Apoio/Voluntário"]),
  message: z.string().optional(),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(),
});
