// Necessary Imoprts
import React, { useEffect, useRef } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { useTaskUI } from "../../context/UIContext";
import PropTypes from "prop-types";


// Initialize the Text Editor with the props we need for its use
const TextEditor = ({ onContentChange, label, description, withAsterisk, value }) => {
  // Here we initialize the useTaskUI in order to use it as a custom Modal
  const { isVisible } = useTaskUI();
  const prevVisibleRef = useRef(isVisible);

  // Then we initialize the editor with the required 'extensions'
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Describe your task" }),
    ],
    // The text editor content will be set to the value prop or default to empty on its absence 
    content:value || "",
    // Upon an update, the editor will parse its contents on a JSON and assign it on contentChange
    // in theory this will make it so we can parse the content
     onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onContentChange(json);
      
    },
  });
  // Now we monitor isVisible and editor with a useEffect hook.
  useEffect(() => {
    if (editor && prevVisibleRef.current && !isVisible) {
     editor.commands.setContent("");
    }
    prevVisibleRef.current = isVisible;
  }, [isVisible, editor]);

  return (
    <>
      <label className="mb-1 font-semibold text-gray-300 flex items-center gap-1 select-none">
        {label}
        {withAsterisk && <span className="text-red-500 text-xl leading-none">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-sm italic text-gray-400 select-none">{description}</p>
      )}
      <RichTextEditor styles={{
        root: {
          backgroundColor: "#00000050",
          border: "0.25px solid #228be650"
        },
        content: {
          backgroundColor: "#00000050",
          border: "0.25px solid #228be650"
        },
        toolbar: {
          backgroundColor: "#00000050",
          display: 'flex',
          justifyContent: 'space-between'

        },
        control: {
          backgroundColor: "#00000050",
          border: "0.25px solid #228be650",
          color: '#FFFFFF',
          fontWeight: '500'

        }
      }} editor={editor} id="task-desc-editor">
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
};

TextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  withAsterisk: PropTypes.node,
  value: PropTypes.any
}

export default TextEditor;
