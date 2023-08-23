import React, { useState } from "react";
import {
  Typography,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatSize,
} from "@mui/icons-material";
import "../../../styles/index.css";
import { Button } from "antd";

const LexicalTextEditor = () => {
  const [text, setText] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    setText("");
  };

  const handleBoldClick = () => {
    setBold(!bold);
  };

  const handleItalicClick = () => {
    setItalic(!italic);
  };

  const handleUnderlineClick = () => {
    setUnderline(!underline);
  };

  const handleFontSizeChange = (event, newFontSize) => {
    if (newFontSize) {
      setFontSize(newFontSize);
    }
  };

  const getFontWeight = bold ? "bold" : "normal";
  const getFontStyle = italic ? "italic" : "normal";
  const getTextDecoration = underline ? "underline" : "none";
  const getFontSize =
    fontSize === "small" ? "14px" : fontSize === "medium" ? "18px" : "16px";

  return (
    <div>
      <div className="font-secondary">توضیحات</div>
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <IconButton onClick={handleBoldClick}>
          <FormatBold color={bold ? "primary" : "inherit"} />
        </IconButton>
        <IconButton onClick={handleItalicClick}>
          <FormatItalic color={italic ? "primary" : "inherit"} />
        </IconButton>
        <IconButton onClick={handleUnderlineClick}>
          <FormatUnderlined color={underline ? "primary" : "inherit"} />
        </IconButton>
        <ToggleButtonGroup
          value={fontSize}
          exclusive
          onChange={handleFontSizeChange}
        >
          <ToggleButton value="small">
            <FormatSize fontSize="small" />
          </ToggleButton>
          <ToggleButton value="medium">
            <FormatSize fontSize="medium" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <TextField
        multiline
        rows={2}
        fullWidth
        value={text}
        onChange={handleTextChange}
        variant="outlined"
        InputProps={{
          style: {
            fontWeight: getFontWeight,
            fontStyle: getFontStyle,
            textDecoration: getTextDecoration,
            fontSize: getFontSize,
          },
        }}
      />
      <div className="flex gap-5 justify-end mt-4">
        <Button
          variant="contained"
          onClick={handleClear}
          className="font-secondary"
        >
          پاک کردن
        </Button>
      </div>
    </div>
  );
};

export default LexicalTextEditor;
