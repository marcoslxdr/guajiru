import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Notícia / Comunicado",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: ["notícia", "comunicado"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
