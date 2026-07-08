import { defineField, defineType } from "sanity";

export const pageDiretoria = defineType({
  name: "pageDiretoria",
  title: "Página Diretoria",
  type: "document",
  fields: [
    defineField({
      name: "boardMembers",
      title: "Direção",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", title: "Cargo", type: "string" },
            { name: "name", title: "Nome", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "fiscalCouncil",
      title: "Conselho Fiscal",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "article13Note",
      title: "Nota Artigo 13 (não remuneração)",
      type: "text",
    }),
  ],
});
