import { BookIcon } from "@sanity/icons/Book";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { ClipboardIcon } from "@sanity/icons/Clipboard";
import { HeartIcon } from "@sanity/icons/Heart";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { RocketIcon } from "@sanity/icons/Rocket";
import { StarIcon } from "@sanity/icons/Star";
import { TagIcon } from "@sanity/icons/Tag";
import { DesktopIcon } from "@sanity/icons/Desktop";
import { PlugIcon } from "@sanity/icons/Plug";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";

// The menu editors see down the left of the Studio.
export const structure = (S) =>
  S.list()
    .title("Training Hub content")
    .items([
      S.listItem().title("Site settings").icon(CogIcon).child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("Home page").icon(HomeIcon).child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem().title("Start here path").icon(RocketIcon).child(S.document().schemaType("startHere").documentId("startHere")),
      S.listItem().title("Badges and levels").icon(StarIcon).child(S.document().schemaType("rewards").documentId("rewards")),
      S.divider(),
      S.documentTypeListItem("trainingModule").title("Training modules").icon(BookIcon)
        .child(S.documentTypeList("trainingModule").title("Training modules").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
      S.documentTypeListItem("quizQuestion").title("Quiz questions").icon(HelpCircleIcon),
      S.documentTypeListItem("value").title("Company values").icon(HeartIcon)
        .child(S.documentTypeList("value").title("Company values").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Technology page").icon(DesktopIcon).child(S.document().schemaType("techPage").documentId("techPage")),
      S.documentTypeListItem("techTool").title("Tech tools").icon(PlugIcon)
        .child(S.documentTypeList("techTool").title("Tech tools").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Compliance page").icon(CheckmarkCircleIcon).child(S.document().schemaType("compliancePage").documentId("compliancePage")),
      S.documentTypeListItem("complianceCourse").title("Compliance courses").icon(CheckmarkCircleIcon)
        .child(S.documentTypeList("complianceCourse").title("Compliance courses").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Documents & Forms page").icon(ClipboardIcon).child(S.document().schemaType("formsPage").documentId("formsPage")),
      S.documentTypeListItem("formDocument").title("Forms").icon(ClipboardIcon)
        .child(S.documentTypeList("formDocument").title("Forms").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Managers page").icon(CaseIcon).child(S.document().schemaType("managersPage").documentId("managersPage")),
      S.listItem().title("Library page").icon(DocumentsIcon).child(S.document().schemaType("libraryPage").documentId("libraryPage")),
      S.documentTypeListItem("libraryItem").title("Library").icon(DocumentsIcon)
        .child(S.documentTypeList("libraryItem").title("Library").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      // The House: the front door to every Stott and May tool (a separate app, stott2026/the-house).
      S.listItem().title("The House").icon(HomeIcon).child(
        S.list().title("The House").items([
          S.listItem().title("House settings").icon(CogIcon).child(S.document().schemaType("houseSettings").documentId("houseSettings")),
          S.documentTypeListItem("houseRoom").title("Rooms").icon(HomeIcon)
            .child(S.documentTypeList("houseRoom").title("Rooms").defaultOrdering([{ field: "order", direction: "asc" }])),
        ])
      ),
    ]);
