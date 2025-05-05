"use client";

import { useEffect, useRef } from "react";
import JoditEditor from "jodit-react";

interface RichTextFieldProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextField: React.FC<RichTextFieldProps> = ({ content, onChange }) => {
  const editorRef = useRef<any>(null);

  const config = {
    height: 300,
    toolbarSticky: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "link",
      "|",
      "undo",
      "redo",
    ],
    style: {
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
    },
  };

  // Sync initial content
  useEffect(() => {
    if (editorRef.current && content && editorRef.current.value !== content) {
      editorRef.current.value = content;
    }
  }, [content]);

  return (
    <div className="rich-text-editor">
      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // Updates on blur
        onChange={(newContent) => {}} // Required by Jodit but not used here
      />
    </div>
  );
};

export default RichTextField;