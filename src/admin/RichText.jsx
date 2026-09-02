import { useEffect, useRef, useState } from 'react'
import { MediaPickerModal } from './Media'

// A lightweight WYSIWYG editor. It edits a contentEditable region and emits
// clean HTML into the post `body` (which the public site renders via .article-html,
// so what you see here matches the live article). Formatting uses the browser's
// built-in editing commands; images come from the media library.

const TOOLS = [
  { cmd: 'bold', label: 'B', title: 'Bold', className: 'font-bold' },
  { cmd: 'italic', label: 'I', title: 'Italic', className: 'italic' },
  { block: 'H2', label: 'H2', title: 'Heading' },
  { block: 'H3', label: 'H3', title: 'Subheading' },
  { block: 'BLOCKQUOTE', label: '❝', title: 'Quote' },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bulleted list' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered list' },
  { action: 'link', label: 'Link', title: 'Add link' },
  { action: 'image', label: '🖼 Image', title: 'Insert image' },
  { block: 'P', label: 'Clear', title: 'Normal text' },
]

export default function RichText({ value, onChange }) {
  const ref = useRef(null)
  const savedRange = useRef(null)
  const [picker, setPicker] = useState(false)

  // Seed the editor once; afterwards it is uncontrolled so the caret never jumps.
  useEffect(() => {
    try { document.execCommand('defaultParagraphSeparator', false, 'p') } catch { /* ignore */ }
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sync = () => onChange(ref.current?.innerHTML || '')

  const saveSelection = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount && ref.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange()
    }
  }

  const restoreSelection = () => {
    const sel = window.getSelection()
    if (savedRange.current) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }

  const exec = (tool) => {
    ref.current?.focus()
    restoreSelection()
    if (tool.cmd) document.execCommand(tool.cmd, false, null)
    else if (tool.block) document.execCommand('formatBlock', false, tool.block)
    else if (tool.action === 'link') {
      const url = prompt('Link URL (include https://)')
      if (url) document.execCommand('createLink', false, url)
    } else if (tool.action === 'image') {
      setPicker(true)
      return
    }
    sync()
  }

  const insertImage = (url) => {
    setPicker(false)
    ref.current?.focus()
    restoreSelection()
    document.execCommand('insertHTML', false, `<img src="${url}" alt="" />`)
    sync()
  }

  return (
    <div className="rounded-lg border border-emerald/15 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-emerald/10 px-2 py-1.5">
        {TOOLS.map((t, i) => (
          <button
            key={i}
            type="button"
            title={t.title}
            onMouseDown={(e) => e.preventDefault()} // keep the editor selection
            onClick={() => exec(t)}
            className={`rounded px-2 py-1 text-[0.82rem] text-emerald transition hover:bg-emerald/8 ${t.className || ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="article-html min-h-[320px] px-4 py-3 text-[0.95rem] outline-none"
        style={{ maxWidth: 'none' }}
      />
      <MediaPickerModal open={picker} onClose={() => setPicker(false)} onPick={insertImage} />
    </div>
  )
}
