import { BookIcon } from "@sanity/icons/Book";
import { HeartIcon } from "@sanity/icons/Heart";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";

// The menu editors see down the left of the Studio.
export const structure = (S) =>
  S.list()
    .title("Training Hub content")
    .items([
      S.listItem().title("Home page").icon(HomeIcon).child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.documentTypeListItem("trainingModule").title("Training modules").icon(BookIcon)
        .child(S.documentTypeList("trainingModule").title("Training modules").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("quizQuestion").title("Quiz questions").icon(HelpCircleIcon),
      S.documentTypeListItem("value").title("Company values").icon(HeartIcon)
        .child(S.documentTypeList("value").title("Company values").defaultOrdering([{ field: "order", direction: "asc" }])),
    ]);
