// How each type of Library file is shown. The types themselves are set in Sanity (libraryItem.js).
export const LIBRARY_KINDS = {
  deck: { label: "Training deck", plural: "Training decks", icon: "presentation" },
  guide: { label: "Guide", plural: "Guides", icon: "book-open" },
  template: { label: "Template", plural: "Templates", icon: "layout-template" },
  form: { label: "Form", plural: "Forms", icon: "clipboard-list" },
};
export const kindOf = (kind) => LIBRARY_KINDS[kind] ?? LIBRARY_KINDS.guide;

const FORMATS = { pptx: "PowerPoint", ppt: "PowerPoint", pdf: "PDF", docx: "Word", doc: "Word", xlsx: "Excel", xls: "Excel" };

// "PowerPoint · 4.4 MB"
export function fileDetails(file) {
  if (!file) return "";
  const format = FORMATS[file.extension?.toLowerCase()] ?? file.extension?.toUpperCase();
  const mb = file.size / 1_000_000;
  const size = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1000))} KB`;
  return [format, file.size ? size : null].filter(Boolean).join(" · ");
}

// The download address: the server checks sign-in, then streams the file from Sanity.
export const downloadUrl = (item) => `/api/library/${encodeURIComponent(item._id)}/download`;

// The preview build has no server, so downloads only work in the live hub.
export const canDownload = import.meta.env.MODE !== "preview";
