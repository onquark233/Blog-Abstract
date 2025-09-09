import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import RefreshIcon from './icons/RefreshIcon';

interface SummaryOutputProps {
  summary: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, onRegenerate, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isLoading) return;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 relative">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
        生成的摘要
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {summary}
      </p>
      <div className="absolute top-4 right-4 flex items-center space-x-1">
         <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="重新生成"
        >
          <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={handleCopy}
          disabled={isLoading}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="复制摘要"
        >
          {isCopied ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ClipboardIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SummaryOutput;