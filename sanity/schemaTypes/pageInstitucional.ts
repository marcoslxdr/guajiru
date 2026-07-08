import { defineField, defineType } from "sanity";

export const pageInstitucional = defineType({
  name: "pageInstitucional",
  title: "Página Institucional",
  type: "document",
  fields: [
    defineField({
      name: "mission",
      title: "Missão",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "vision",
      title: "Visão",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "values",
      title: "Valores",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
