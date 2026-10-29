import { defineField, defineType } from "sanity";
import { ClipboardIcon } from "@sanity/icons/Clipboard";

// The words at the top of the hub's Documents & Forms page. There is only one of these.
export const formsPage = defineType({
  name: "formsPage",
  title: "Documents & Forms page",
  type: "document",
  icon: ClipboardIcon,
  fields: [
    defineField({ name: "title", title: "Main heading", type: "string", initialValue: "Documents & Forms", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
  ],
  preview: { prepare: () => ({ title: "Documents & Forms page" }) },
});
