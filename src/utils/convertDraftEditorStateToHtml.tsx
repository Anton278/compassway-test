import {
  convertToHTML,
  type RawDraftContentBlockWithCustomType,
} from "draft-convert";
import { type ContentState } from "react-draft-wysiwyg";

export const convertDraftEditorStateToHtml = (contentState: ContentState) => {
  if (!contentState.hasText()) {
    return ""; // Return an empty string for empty content
  }

  const html = convertToHTML({
    blockToHTML: (block: RawDraftContentBlockWithCustomType<any>) => {
      if (block.type === "unstyled") {
        return <p>{block.text || ""}</p>;
      }
      // Add other block type conversions here if needed
    },
  })(contentState);

  return html;
};
