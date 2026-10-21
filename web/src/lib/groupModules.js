// Groups modules by their category, in the categories' display order. Modules without a
// category go last. With no categories at all, everything shows as one group.
export function groupModules(modules) {
  const groups = new Map();
  for (const m of modules) {
    const id = m.category?._id ?? "none";
    if (!groups.has(id)) {
      groups.set(id, { id, title: m.category?.title, description: m.category?.description, order: m.category?.order ?? Infinity, modules: [] });
    }
    groups.get(id).modules.push(m);
  }
  const list = [...groups.values()].sort((a, b) => a.order - b.order);
  const fallback = list.length === 1 ? "Training modules" : "More modules";
  return list.map((g) => ({ ...g, title: g.title ?? fallback }));
}
