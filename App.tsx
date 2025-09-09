import React, { useState, useCallback } from 'react';
import { generateSummary } from './services/geminiService';
import Header from './components/Header';
import TextAreaInput from './components/TextAreaInput';
import SummaryOutput from './components/SummaryOutput';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const MAX_CHARACTERS = 5000;

const App: React.FC = () => {
  const [blogContent, setBlogContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    if (!blogContent.trim()) {
      setError('请输入博客文章内容。');
      return;
    }

    setIsLoading(true);
    setError(null);
    // Do not clear the summary on regenerate, so the user can see the old one while waiting.
    // setSummary(''); 

    try {
      const result = await generateSummary(blogContent);
      setSummary(result);
    // FIX: Added curly braces to the catch block to fix a syntax error. This resolves multiple cascading type errors.
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成摘要时发生未知错误。');
    } finally {
      setIsLoading(false);
    }
  }, [blogContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogContent(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <TextAreaInput
              value={blogContent}
              onChange={handleContentChange}
              placeholder="在这里粘贴您的博客文章..."
              maxLength={MAX_CHARACTERS}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleGenerateSummary}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    生成中...
                  </>
                ) : (
                  '生成摘要'
                )}
              </button>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          {summary && <SummaryOutput summary={summary} onRegenerate={handleGenerateSummary} isLoading={isLoading} />}
        </main>
      </div>
    </div>
  );
};

export default App;
