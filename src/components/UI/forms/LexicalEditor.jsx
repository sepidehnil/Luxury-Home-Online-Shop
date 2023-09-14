import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function LexicalTextEditor({ defaultText = "", onChange }) {
  const [text, setText] = useState(defaultText);
  const editorRef = useRef(null);
  const [error, setError] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleTextChange = (content) => {
    setText(content);
    log();
    onChange(content);

    if (hasBlurred && content.trim() !== "") {
      setError("");
    }
  };

  const handleBlur = () => {
    setHasBlurred(true);
    if (text.trim() === "") {
      setError("توضیحات الزامی است.");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleTextChange}
        onBlur={handleBlur}
        initialValue={text}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {hasBlurred && error && (
        <div style={{ color: "red", fontSize: "0.7rem" }}>{error}</div>
      )}
    </>
  );
}
