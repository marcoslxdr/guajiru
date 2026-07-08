import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "contactEmail",
      title: "E-mail para formulários",
      type: "string",
    }),
    defineField({ name: "address", title: "Endereço", type: "text" }),
    defineField({ name: "mapLat", title: "Latitude", type: "number" }),
    defineField({ name: "mapLng", title: "Longitude", type: "number" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
  ],
});
