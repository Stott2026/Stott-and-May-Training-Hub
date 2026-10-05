// The address of a file in web/public. Relative in the preview build, so it works as a single page.
// The preview build swaps each file name for the picture itself (a data: address), used as is.
export const assetUrl = (path) => (path.startsWith("data:") ? path : `${import.meta.env.BASE_URL}${path}`);
