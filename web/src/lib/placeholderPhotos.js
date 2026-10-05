// TEMPORARY: photos from the brand guidelines, shown only until real photos are uploaded in Sanity.
// Once the Home page and each module have a header photo in the Studio, those are used instead.
import { assetUrl } from "./assetUrl.js";

export const placeholderPhotos = {
  homeHero: assetUrl("placeholders/person-5.webp"),
  values: assetUrl("placeholders/person-3.webp"),
  phraseAvatar: assetUrl("placeholders/person-6.webp"),
  // Module headers take turns through these, by display order.
  // Written out in full so the preview build can find and embed each one.
  moduleHeroes: [
    assetUrl("placeholders/person-1.webp"),
    assetUrl("placeholders/person-2.webp"),
    assetUrl("placeholders/person-4.webp"),
    assetUrl("placeholders/person-3.webp"),
    assetUrl("placeholders/person-5.webp"),
    assetUrl("placeholders/person-6.webp"),
  ],
};
