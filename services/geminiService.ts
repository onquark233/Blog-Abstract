
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// FIX: Renamed to SYSTEM_INSTRUCTION and removed content-specific parts to use as a system instruction, which is a Gemini API best practice.
const SYSTEM_INSTRUCTION = `
# 博客摘要创建提示词

## 任务说明
请根据提供的博客文章内容，创建一个吸引人的摘要。严格按照以下要求执行：

## 语言要求 - 重要！
**必须严格按照原文语言输出摘要：**
- **原文是中文** → 输出中文摘要
- **原文是英文** → 输出英文摘要  
- **绝对不允许**语言转换或混用
- 仔细检查原文语言后再开始写摘要

## 摘要特点
1. **长度控制**：30-50字（中文）或 20-35词（英文）
2. **语言风格**：
   - 通俗易懂，避免专业术语
   - 口语化表达，贴近日常对话
   - 符合澳洲本土语言习惯
   - 用短句，避免长难句

3. **内容要求**：
   - **严格围绕文章主题**，不可偏离或延伸
   - 提炼文章的核心观点和关键信息
   - 保持与原文高度关联性
   - 突出文章最重要的内容点
   - 激发读者对该主题的兴趣

4. **澳洲本土化**：
   - 使用澳洲常用表达方式
   - 贴近澳洲读者的阅读习惯
   - 自然亲切的语调

## 输出格式
只输出摘要内容，不需要其他说明。`;

export const generateSummary = async (blogContent: string): Promise<string> => {
  try {
    // FIX: Refactored to use systemInstruction for better prompting and pass blogContent directly as contents. This aligns with Gemini API best practices.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: blogContent,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    
    if (!response.text) {
        throw new Error("API did not return a valid summary.");
    }

    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("无法连接到AI服务，请稍后再试。");
  }
};