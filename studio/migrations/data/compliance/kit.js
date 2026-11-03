// Small helpers for writing compliance courses as data, in the shape the Studio expects
// (studio/schemaTypes/complianceCourse.js). import-compliance.js adds the _key values.
export const text = (heading, body, bullets) => ({ _type: "ccText", ...(heading && { heading }), ...(body && { body }), ...(bullets && { bullets }) });
export const keyPoints = (title, points) => ({ _type: "ccKeyPoints", title, points });
export const law = (name, summary) => ({ _type: "ccLaw", name, summary });
export const doDont = (dos, donts) => ({ _type: "ccDoDont", dos, donts });
export const stat = (number, label, source) => ({ _type: "ccStat", number, label, source });
export const figure = (drawing, labels, caption) => ({ _type: "ccIllustration", drawing, caption, labels: labels.map(([spot, t]) => ({ _type: "drawingLabel", spot, text: t })) });
export const spotIt = (title, instructions, drawing, spots) => ({
  _type: "ccSpotIt", title, instructions, drawing,
  spots: spots.map(([spot, label, problem, explanation]) => ({ _type: "spotItem", spot, label, problem, explanation })),
});
export const sorter = (title, instructions, groups, items) => ({
  _type: "ccSorter", title, instructions, groups,
  items: items.map(([t, group, why]) => ({ _type: "sortItem", text: t, group, why })),
});
export const scenario = (situation, options, title = "What would you do?") => ({
  _type: "ccScenario", title, situation,
  options: options.map(([t, best, feedback]) => ({ _type: "scenarioOption", text: t, best, feedback })),
});
export const checklist = (title, items) => ({ _type: "ccChecklist", title, items });
// correct is the number of the right answer, 1 for the first. The hub shuffles the answers.
export const q = (question, options, correct, explanation) => ({ _type: "assessmentQuestion", question, options, correct, explanation });
