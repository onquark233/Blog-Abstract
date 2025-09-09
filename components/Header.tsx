
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        博客摘要生成器
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        使用 AI 快速为您的博客文章创建引人入胜、符合澳洲本土习惯的摘要。
      </p>
    </header>
  );
};

export default Header;
