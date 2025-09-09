import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  maxLength: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange, placeholder, maxLength }) => {
  const characterCount = value.length;
  const isLimitReached = characterCount >= maxLength;

  return (
    <div>
      <label htmlFor="blog-content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        文章内容
      </label>
      <textarea
        id="blog-content"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={12}
        maxLength={maxLength}
        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        aria-describedby="character-count"
      />
      <div
        id="character-count"
        className={`text-right text-sm mt-2 font-mono ${
          isLimitReached 
          ? 'text-red-500 dark:text-red-400' 
          : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {characterCount} / {maxLength}
      </div>
    </div>
  );
};

export default TextAreaInput;
