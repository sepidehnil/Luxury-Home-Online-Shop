// import React, { useState } from "react";
// import {
//   Typography,
//   TextField,
//   IconButton,
//   ToggleButton,
//   ToggleButtonGroup,
// } from "@mui/material";
// import {
//   FormatBold,
//   FormatItalic,
//   FormatUnderlined,
//   FormatSize,
// } from "@mui/icons-material";
// import "../../../styles/index.css";
// import { Button } from "antd";

// const LexicalTextEditor = ({ onChange, defaultText = "" }) => {
//   const [text, setText] = useState(defaultText);
//   const [bold, setBold] = useState(false);
//   const [italic, setItalic] = useState(false);
//   const [underline, setUnderline] = useState(false);
//   const [fontSize, setFontSize] = useState("medium");

//   const handleTextChange = (event) => {
//     const newText = event.target.value;
//     setText(newText);
//     onChange(newText); // Call the onChange callback with the new description
//   };
//   const handleClear = () => {
//     setText("");
//   };

//   const handleBoldClick = () => {
//     setBold(!bold);
//   };

//   const handleItalicClick = () => {
//     setItalic(!italic);
//   };

//   const handleUnderlineClick = () => {
//     setUnderline(!underline);
//   };

//   const handleFontSizeChange = (event, newFontSize) => {
//     if (newFontSize) {
//       setFontSize(newFontSize);
//     }
//   };
//   console.log(text);
//   const getFontWeight = bold ? "bold" : "normal";
//   const getFontStyle = italic ? "italic" : "normal";
//   const getTextDecoration = underline ? "underline" : "none";
//   const getFontSize =
//     fontSize === "small" ? "14px" : fontSize === "medium" ? "18px" : "16px";

//   return (
//     <div>
//       <div className="font-secondary">توضیحات</div>
//       <div style={{ display: "flex", marginBottom: "16px" }}>
//         <IconButton onClick={handleBoldClick}>
//           <FormatBold color={bold ? "primary" : "inherit"} />
//         </IconButton>
//         <IconButton onClick={handleItalicClick}>
//           <FormatItalic color={italic ? "primary" : "inherit"} />
//         </IconButton>
//         <IconButton onClick={handleUnderlineClick}>
//           <FormatUnderlined color={underline ? "primary" : "inherit"} />
//         </IconButton>
//         <ToggleButtonGroup
//           value={fontSize}
//           exclusive
//           onChange={handleFontSizeChange}
//         >
//           <ToggleButton value="small">
//             <FormatSize fontSize="small" />
//           </ToggleButton>
//           <ToggleButton value="medium">
//             <FormatSize fontSize="medium" />
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </div>
//       <TextField
//         multiline
//         rows={2}
//         fullWidth
//         value={text}
//         onChange={handleTextChange}
//         variant="outlined"
//         InputProps={{
//           style: {
//             fontWeight: getFontWeight,
//             fontStyle: getFontStyle,
//             textDecoration: getTextDecoration,
//             fontSize: getFontSize,
//           },
//         }}
//       />
//       <div className="flex gap-5 justify-end mt-4">
//         <Button
//           variant="contained"
//           onClick={handleClear}
//           className="font-secondary"
//         >
//           پاک کردن
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LexicalTextEditor;

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function LexicalTextEditor({ defaultText = "", onChange }) {
  const [text, setText] = useState(defaultText);
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleTextChange = (content) => {
    setText(content);
    log(); // Log the content whenever it changes
    onChange(content);
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleTextChange} // Use onEditorChange event
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
    </>
  );
}
