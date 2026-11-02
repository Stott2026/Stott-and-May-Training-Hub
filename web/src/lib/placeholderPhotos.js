// TEMPORARY: photos from the brand guidelines, shown only until real photos are uploaded in Sanity.
// Once the Home page and each module have a header photo in the Studio, those are used instead.
import { assetUrl } from "./assetUrl.js";

export const placeholderPhotos = {
  homeHero: assetUrl("placeholders/person-5.webp"),
  values: assetUrl("placeholders/person-3.webp"),
  phraseAvatar: assetUrl("placeholders/person-6.webp"),
  // Section headers. Cut-outs (person-*) sit in brand shapes; office photos (scene-*) in a frame.
  // person-7 and scenes 4 to 7 are from the brand's own collateral (LATAM, AI/ML and Astralis pieces).
  tech: assetUrl("placeholders/person-7.webp"),
  achievements: assetUrl("placeholders/person-2.webp"),
  start: assetUrl("placeholders/scene-4.webp"),
  managers: assetUrl("placeholders/scene-6.webp"),
  library: assetUrl("placeholders/scene-7.webp"),
  forms: assetUrl("placeholders/scene-5.webp"),
  // Module headers take turns through these, by display order.
  // Written out in full so the preview build can find and embed each one.
  moduleHeroes: [
    assetUrl("placeholders/person-1.webp"),
    assetUrl("placeholders/person-2.webp"),
    assetUrl("placeholders/person-4.webp"),
    assetUrl("placeholders/person-3.webp"),
    assetUrl("placeholders/person-5.webp"),
    assetUrl("placeholders/person-6.webp"),
    assetUrl("placeholders/person-7.webp"),
  ],
};
