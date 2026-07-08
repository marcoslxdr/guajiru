import { defineField, defineType } from "sanity";

export const transparencyDocument = defineType({
  name: "transparencyDocument",
  title: "Documento de Transparência",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "docType",
      title: "Tipo",
      type: "string",
      options: { list: ["ata", "estatuto", "relatório"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "Arquivo PDF",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "date",
      validation: (rule) => rule.required(),
    }),
  ],
});
