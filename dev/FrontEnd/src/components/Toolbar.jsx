import React from "react";
import {
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const format = (type) => () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  return (
    <div className="flex gap-2 mb-2">
      <button type="button" onClick={format("bold")} className="font-bold">
        B
      </button>
      <button type="button" onClick={format("italic")} className="italic">
        I
      </button>
      {/* <button type="button" onClick={format("underline")} className="underline">
        U
      </button>
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(  INSERT_TAB_COMMAND, undefined)
        }
        className="px-2 py-1 rounded bg-stone-300 hover:bg-stone-400"
      > 
        • Bullets
      </button>
       <label for="format">Format</label>
      <select className="w-1/4 text-center bg-stone-300 rounded">
        <option disabled></option>
        <option>
          <button
            type="button"
            onClick={() =>
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            }
            className="px-2 py-1 rounded bg-stone-300 hover:bg-stone-400"
          >
            • Bullets
          </button>
        </option>
        <option>skm</option>
      </select> */}
    </div>
  );
};

export default Toolbar;
