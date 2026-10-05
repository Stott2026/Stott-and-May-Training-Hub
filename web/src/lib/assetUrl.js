// The address of a file in web/public. Relative in the preview build, so it works as a single page.
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
