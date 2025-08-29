import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TipTapRenderer = ({ content }) => {
  // Create a read-only editor with the stored JSON
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: content || { type: 'doc', content: [] },
  })

  return <EditorContent editor={editor} />
}

export default TipTapRenderer
