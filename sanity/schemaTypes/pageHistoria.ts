import { defineField, defineType } from "sanity";

export const pageHistoria = defineType({
  name: "pageHistoria",
  title: "Página História",
  type: "document",
  fields: [
    defineField({
      name: "narrative",
      title: "Narrativa",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "founders",
      title: "Fundadores",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nome", type: "string" },
            { name: "bio", title: "Bio (opcional)", type: "text" },
          ],
        },
      ],
    }),
  ],
});
