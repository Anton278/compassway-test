import { convertToHTML } from "draft-convert";

export const convertDraftEditorStateToHtml = (contentState: any) => {
  if (!contentState.hasText()) {
    return ""; // Return an empty string for empty content
  }

  const html = convertToHTML({
    blockToHTML: (block: any) => {
      if (block.type === "unstyled") {
        return <p>{block.text || ""}</p>;
      }
      // Add other block type conversions here if needed
    },
  })(contentState);

  return html;
};
