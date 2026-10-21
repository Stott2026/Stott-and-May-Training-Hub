import { defineField } from "sanity";

// Which part of the hub something belongs to. Manager material only shows on the Managers page,
// so it never mixes with the consultants' training, quiz, search or Library.
export const areaField = (what) =>
  defineField({
    name: "area",
    title: "Part of the hub",
    type: "string",
    options: { list: [{ title: "Training (for everyone)", value: "training" }, { title: "Managers", value: "managers" }], layout: "radio", direction: "horizontal" },
    initialValue: "training",
    description: `Choose Managers to show ${what} on the Managers page only.`,
  });
