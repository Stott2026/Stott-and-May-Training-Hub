import { defineArrayMember, defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { ACCENT_OPTIONS, COMPLIANCE_CATEGORIES, DRAWING_OPTIONS, ICON_OPTIONS, REGION_OPTIONS, SPOT_OPTIONS } from "./options.js";

const list = (name, title, description) => ({ name, title, description, type: "array", of: [{ type: "text", rows: 2 }] });

// The kinds of content a lesson can hold. Each is shown in its own way in the hub
// (web/src/components/compliance/LessonBlocks.jsx).
const BLOCKS = [
  {
    type: "object", name: "ccText", title: "Text",
    fields: [
      { name: "heading", title: "Heading (optional)", type: "string" },
      { name: "body", title: "Paragraphs", type: "text", rows: 6, description: "Leave a blank line between paragraphs." },
      list("bullets", "Bullet points (optional)"),
    ],
    preview: { select: { title: "heading", body: "body" }, prepare: ({ title, body }) => ({ title: title || body?.slice(0, 60) || "Text", subtitle: "Text" }) },
  },
  {
    type: "object", name: "ccKeyPoints", title: "Key points",
    fields: [
      { name: "title", title: "Title", type: "string", initialValue: "Key points" },
      list("points", "Points"),
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Key points" }) },
  },
  {
    type: "object", name: "ccLaw", title: "The law",
    fields: [
      { name: "name", title: "Law or regulation", type: "string", description: "For example: Health and Safety at Work etc. Act 1974", validation: (r) => r.required() },
      { name: "summary", title: "What it means for you", type: "text", rows: 4, validation: (r) => r.required() },
    ],
    preview: { select: { title: "name" }, prepare: ({ title }) => ({ title, subtitle: "The law" }) },
  },
  {
    type: "object", name: "ccDoDont", title: "Do and don't",
    fields: [list("dos", "Do"), list("donts", "Don't")],
    preview: { prepare: () => ({ title: "Do and don't" }) },
  },
  {
    type: "object", name: "ccStat", title: "A number to remember",
    fields: [
      { name: "number", title: "Number", type: "string", description: "For example: 776,000", validation: (r) => r.required().max(16) },
      { name: "label", title: "What it is", type: "text", rows: 2, validation: (r) => r.required() },
      { name: "source", title: "Source", type: "string" },
    ],
    preview: { select: { title: "number", subtitle: "label" } },
  },
  {
    type: "object", name: "ccIllustration", title: "Drawing or picture",
    description: "Pick one of the hub's drawings, or upload a picture.",
    fields: [
      { name: "drawing", title: "Drawing", type: "string", options: { list: DRAWING_OPTIONS } },
      { name: "image", title: "Or a picture", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Image description", type: "string" }] },
      {
        name: "labels", title: "Labels on the drawing (optional)", type: "array",
        description: "Numbered labels on the drawing. Pick the point each one attaches to.",
        of: [{ type: "object", name: "drawingLabel", fields: [
          { name: "spot", title: "Point on the drawing", type: "string", options: { list: SPOT_OPTIONS }, validation: (r) => r.required() },
          { name: "text", title: "Label", type: "text", rows: 2, validation: (r) => r.required() },
        ], preview: { select: { title: "text", subtitle: "spot" } } }],
      },
      { name: "caption", title: "Caption", type: "string" },
    ],
    validation: (r) => r.custom((v) => (v?.drawing || v?.image?.asset ? true : "Pick a drawing or upload a picture")),
    preview: { select: { title: "caption", drawing: "drawing", media: "image" }, prepare: ({ title, drawing, media }) => ({ title: title || drawing || "Picture", subtitle: "Drawing or picture", media }) },
  },
  {
    type: "object", name: "ccSpotIt", title: "Spot it (interactive drawing)",
    description: "The learner checks each point on a drawing and decides whether it's fine or a problem.",
    fields: [
      { name: "title", title: "Title", type: "string", initialValue: "Spot the problems", validation: (r) => r.required() },
      { name: "instructions", title: "Instructions", type: "string" },
      { name: "drawing", title: "Drawing", type: "string", options: { list: DRAWING_OPTIONS }, validation: (r) => r.required() },
      {
        name: "spots", title: "Points to check", type: "array", validation: (r) => r.required().min(3),
        of: [{ type: "object", name: "spotItem", fields: [
          { name: "spot", title: "Point on the drawing", type: "string", options: { list: SPOT_OPTIONS }, validation: (r) => r.required() },
          { name: "label", title: "What it is", type: "string", description: "Shown on the marker, for example: The laptop", validation: (r) => r.required().max(40) },
          { name: "problem", title: "This is a problem", type: "boolean", initialValue: true },
          { name: "explanation", title: "Explanation", type: "text", rows: 3, validation: (r) => r.required() },
        ], preview: { select: { title: "label", problem: "problem" }, prepare: ({ title, problem }) => ({ title, subtitle: problem ? "Problem" : "Fine" }) } }],
      },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Spot it" }) },
  },
  {
    type: "object", name: "ccSorter", title: "Sort it (interactive)",
    description: "The learner sorts each item into the right group.",
    fields: [
      { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
      { name: "instructions", title: "Instructions", type: "string" },
      { name: "groups", title: "Groups", type: "array", of: [{ type: "string" }], description: "Two or three groups, for example: Safe / Needs fixing", validation: (r) => r.required().min(2).max(3).unique() },
      {
        name: "items", title: "Items", type: "array", validation: (r) => r.required().min(3).max(10),
        of: [{ type: "object", name: "sortItem", fields: [
          { name: "text", title: "Item", type: "text", rows: 2, validation: (r) => r.required() },
          { name: "group", title: "Right group", type: "string", description: "Type it exactly as in Groups.", validation: (r) => r.required() },
          { name: "why", title: "Why", type: "text", rows: 2 },
        ], preview: { select: { title: "text", subtitle: "group" } } }],
      },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Sort it" }) },
  },
  {
    type: "object", name: "ccScenario", title: "What would you do? (interactive)",
    fields: [
      { name: "title", title: "Title", type: "string", initialValue: "What would you do?" },
      { name: "situation", title: "Situation", type: "text", rows: 4, validation: (r) => r.required() },
      {
        name: "options", title: "Choices", type: "array", validation: (r) => r.required().min(2).max(5),
        of: [{ type: "object", name: "scenarioOption", fields: [
          { name: "text", title: "Choice", type: "text", rows: 2, validation: (r) => r.required() },
          { name: "best", title: "This is the best choice", type: "boolean", initialValue: false },
          { name: "feedback", title: "Feedback", type: "text", rows: 3, validation: (r) => r.required() },
        ], preview: { select: { title: "text", best: "best" }, prepare: ({ title, best }) => ({ title, subtitle: best ? "Best choice" : "" }) } }],
      },
    ],
    preview: { select: { title: "situation" }, prepare: ({ title }) => ({ title, subtitle: "What would you do?" }) },
  },
  {
    type: "object", name: "ccChecklist", title: "Check your own set-up",
    description: "A list the learner ticks off for themselves. Nothing they tick is stored.",
    fields: [
      { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
      list("items", "Items"),
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Checklist" }) },
  },
];

// A compliance course: lessons taken in order, then an assessment with a pass mark. Kept apart
// from the training modules because these are company requirements with their own sign-off.
export const complianceCourse = defineType({
  name: "complianceCourse",
  title: "Compliance course",
  type: "document",
  icon: CheckmarkCircleIcon,
  groups: [
    { name: "about", title: "About", default: true },
    { name: "lessons", title: "Lessons" },
    { name: "assessment", title: "Assessment" },
    { name: "signoff", title: "Sign-off" },
  ],
  fields: [
    defineField({ name: "title", title: "Course title", type: "string", group: "about", validation: (r) => r.required().max(70) }),
    defineField({ name: "slug", title: "Page address", type: "slug", group: "about", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", group: "about", options: { list: COMPLIANCE_CATEGORIES }, description: "The group it sits in on the Compliance page.", validation: (r) => r.required() }),
    defineField({ name: "region", title: "Who it's for", type: "string", group: "about", options: { list: REGION_OPTIONS, layout: "radio" }, initialValue: "global", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2, group: "about", description: "One or two sentences for the course card.", validation: (r) => r.required().max(220) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 4, group: "about", description: "Shown at the top of the course page: why it matters and what's covered." }),
    defineField({ name: "outcomes", title: "By the end you will be able to", type: "array", group: "about", of: [{ type: "string" }] }),
    defineField({ name: "minutes", title: "About how long (minutes)", type: "number", group: "about", validation: (r) => r.required().min(5).max(180) }),
    defineField({ name: "renewMonths", title: "Renew every (months)", type: "number", group: "about", initialValue: 12, validation: (r) => r.required().min(1).max(60) }),
    defineField({ name: "order", title: "Order on the Compliance page", type: "number", group: "about" }),
    defineField({ name: "icon", title: "Icon", type: "string", group: "about", options: { list: ICON_OPTIONS }, initialValue: "shield-check" }),
    defineField({ name: "accent", title: "Colour", type: "string", group: "about", options: { list: ACCENT_OPTIONS }, initialValue: "brand" }),

    defineField({
      name: "lessons", title: "Lessons", type: "array", group: "lessons",
      description: "Taken in this order. Every interactive part must be finished before a lesson can be completed.",
      validation: (r) => r.required().min(1),
      of: [defineArrayMember({
        type: "object", name: "lesson",
        fields: [
          { name: "title", title: "Lesson title", type: "string", validation: (r) => r.required().max(80) },
          { name: "summary", title: "In one line", type: "string", validation: (r) => r.max(160) },
          { name: "blocks", title: "Content", type: "array", of: BLOCKS, validation: (r) => r.required().min(1) },
        ],
        preview: { select: { title: "title", blocks: "blocks" }, prepare: ({ title, blocks = [] }) => ({ title, subtitle: `${blocks.length} parts` }) },
      })],
    }),

    defineField({ name: "passMark", title: "Pass mark (%)", type: "number", group: "assessment", initialValue: 80, validation: (r) => r.required().min(50).max(100) }),
    defineField({ name: "questionsPerAttempt", title: "Questions per attempt", type: "number", group: "assessment", initialValue: 10, description: "Drawn at random from the questions below, so each attempt is different. Have more questions than this.", validation: (r) => r.required().min(5).max(30) }),
    defineField({
      name: "questions", title: "Question bank", type: "array", group: "assessment",
      validation: (r) => r.required().min(5),
      of: [defineArrayMember({
        type: "object", name: "assessmentQuestion",
        fields: [
          { name: "question", title: "Question", type: "text", rows: 2, validation: (r) => r.required() },
          { name: "options", title: "Answers", type: "array", of: [{ type: "string" }], validation: (r) => r.required().min(2).max(5) },
          { name: "correct", title: "Number of the right answer (1 for the first)", type: "number", validation: (r) => r.required().min(1).max(5) },
          { name: "explanation", title: "Explanation", type: "text", rows: 2, description: "Shown if they get it wrong." },
        ],
        preview: { select: { title: "question" } },
      })],
    }),

    defineField({ name: "sources", title: "Sources and further reading", type: "array", group: "signoff",
      description: "Shown at the end of the course.",
      of: [{ type: "object", name: "source", fields: [
        { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
        { name: "url", title: "Web address", type: "url" },
      ], preview: { select: { title: "title", subtitle: "url" } } }] }),
    defineField({ name: "approved", title: "Signed off by HR and Compliance", type: "boolean", group: "signoff", initialValue: false, description: "Until this is ticked, the course shows a \"Draft for review\" notice." }),
    defineField({ name: "approvedBy", title: "Signed off by", type: "string", group: "signoff" }),
    defineField({ name: "approvedOn", title: "Signed off on", type: "date", group: "signoff" }),
    defineField({ name: "reviewNotes", title: "Notes for the reviewers", type: "text", rows: 8, group: "signoff", description: "Not shown in the hub. Points to check or fill in before sign-off." }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", region: "region", approved: "approved" }, prepare: ({ title, region, approved }) => ({ title, subtitle: `${REGION_OPTIONS.find((r) => r.value === region)?.title ?? ""}${approved ? "" : " · draft for review"}` }) },
});
