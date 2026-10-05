import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

// The words on the hub's home page. There is only one of these.
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "heroTitle", title: "Main heading", type: "string", initialValue: "Training Hub", validation: (r) => r.required() }),
    defineField({ name: "heroIntro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading.", validation: (r) => r.required() }),
    defineField({ name: "heroImage", title: "Header photo", type: "image", options: { hotspot: true }, description: "A cut-out person photo with a transparent background looks best.", fields: [{ name: "alt", title: "Image description", type: "string" }] }),
    defineField({ name: "philosophyTitle", title: "Philosophy heading", type: "string", initialValue: "The Stott and May Way" }),
    defineField({ name: "philosophyText", title: "Philosophy text", type: "text", rows: 4 }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
