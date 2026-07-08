import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Foto de Treino",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
    defineField({ name: "trainingDate", title: "Data do treino", type: "date" }),
    defineField({
      name: "published",
      title: "Publicado",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
