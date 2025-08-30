import React from "react";
import PropTypes from "prop-types";
import {
  $getRoot,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  ListNode,
  ListItemNode,
} from "@lexical/list";
import Toolbar from "../Toolbar";

const theme = {
  paragraph: "text-base text-black",
};

const onError = (error) => {
  console.error(error);
};

const TextAreaComponent = ({ onChange }) => {
  const initialConfig = {
    namespace: "MomentumEditor",
    theme,
    onError,
    nodes: [ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md p-1 bg-stone-200 text-black min-h-8 w-full font-sans tracking-wider">
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full min-h-12 text-sm p-2 rounded bg-stone-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const plainText = $getRoot().getTextContent();
              onChange(plainText);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
};

export default TextAreaComponent;

TextAreaComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};