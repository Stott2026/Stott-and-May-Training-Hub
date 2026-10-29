import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

// Settings for the whole hub. There is only one of these.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick links",
      type: "array",
      description: "Buttons always shown in the hub's top bar, for example the Marketing Hub. They open in a new tab. The first one is also where 'Look here' cards link when they have no address of their own.",
      validation: (r) => r.max(3),
      of: [
        {
          type: "object",
          name: "quickLink",
          fields: [
            { name: "label", title: "Button text", type: "string", description: "Short, for example: Marketing Hub.", validation: (r) => r.required().max(24) },
            { name: "url", title: "Web address", type: "url", description: "Open the page in your browser and copy the address from the address bar.", validation: (r) => r.required().uri({ scheme: ["https"] }) },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
