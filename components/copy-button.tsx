import copy from 'copy-to-clipboard'
import { useEffect, useState } from 'react'

function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [isCopied, text])
  return (
    <div>
      <button
        onClick={() => {
          copy(text)
          setIsCopied(true)
        }}
      >
        {isCopied ? 'Copied!' : 'Copy to clipboard'}
      </button>
    </div>
  )
}

export default CopyButton
