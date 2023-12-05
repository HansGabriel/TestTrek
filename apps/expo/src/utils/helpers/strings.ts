import type { QuestionType } from "../../stores/useQuestionStore";

export const mapQuestionType = (type: QuestionType) => {
  switch (type) {
    case "identification":
      return "identification";
    case "multi_select":
      return "multiselect";
    case "true_or_false":
      return "trueOrFalse";
    case "multiple_choice":
      return "multipleChoice";
    default:
      return "multipleChoice";
  }
};

export const removeTags = (htmlContent: string) => {
  if (htmlContent === null || htmlContent === "") {
    return "";
  } else {
    htmlContent = htmlContent.toString();
  }

  let contentWithoutTags = htmlContent.replace(/(<([^>]+)>)/gi, " ");

  const specialChars: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
    "&quot;": '"',
    "&apos;": "'",
    "&copy;": "©",
    "&reg;": "®",
    // Add more special characters and their replacements here
  };

  for (const char in specialChars) {
    if (Object.prototype.hasOwnProperty.call(specialChars, char)) {
      contentWithoutTags = contentWithoutTags
        .split(char)
        .join(specialChars[char]);
    }
  }

  return contentWithoutTags;
};

export const extractHighlightedText = (reviewerContent: string) => {
  const regex =
    /<span style="(?:font-size: 1em; )?background-color: yellow;">(?:<b>)*(?:<i>)*(?:<u>)*([\s\S]*?)(?:<\/u>)*(?:<\/i>)*(?:<\/b>)*<\/span>/g;

  const matchArray = [...reviewerContent.matchAll(regex)];

  let highlightedText = " ";

  for (const match of matchArray) {
    highlightedText = highlightedText + " " + match[1];
  }

  return highlightedText;
};
