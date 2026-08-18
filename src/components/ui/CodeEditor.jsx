import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeEditor({ code, language = 'json', title, maxHeight = '400px', className = '' }) {
  const [copied, setCopied] = React.useState(false);
  const codeStr = typeof code === 'object' ? JSON.stringify(code, null, 2) : String(code || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-800 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <span className="text-xs text-gray-400 font-mono">{title || language}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors">
          {copied ? <><Check size={12} className="text-green-400" /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <div style={{ maxHeight, overflow: 'auto' }}>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: '12px' }}
          showLineNumbers
        >
          {codeStr}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
