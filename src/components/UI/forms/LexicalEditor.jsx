import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
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
    fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}
    >
      <Typography variant="h6" className="font-secondary">
        توضیحات
      </Typography>
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
          <ToggleButton value="large">
            <FormatSize fontSize="large" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <TextField
        label="توضیحات خود را وارد کنید"
        multiline
        rows={2}
        fullWidth
        value={text}
        onChange={handleTextChange}
        variant="outlined"
        InputProps={{
          className: "font-secondary",
          style: {
            fontWeight: getFontWeight,
            fontStyle: getFontStyle,
            textDecoration: getTextDecoration,
            fontSize: getFontSize,
          },
        }}
      />
      <div className="flex gap-5 justify-end mt-4">
        <Button variant="contained" color="primary" className="font-secondary">
          ذخیره
        </Button>
        <Button
          variant="contained"
          onClick={handleClear}
          className="font-secondary"
        >
          پاک کردن
        </Button>
      </div>
    </Paper>
  );
};

export default LexicalTextEditor;
