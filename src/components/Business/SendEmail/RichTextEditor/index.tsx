import { Typography } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichTextEditor({
  editorState,
  setEditorState,
  error,
}: any) {
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperStyle={{
          border: "1px solid #ccc",
        }}
        editorStyle={{
          maxHeight: 200,
        }}
        toolbar={{
          options: ["blockType", "inline", "list"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          blockType: {
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
          },
        }}
      />
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}
