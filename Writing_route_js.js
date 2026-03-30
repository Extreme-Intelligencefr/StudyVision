import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GRADE_LABELS = {
  middle_school: 'Middle School (Grades 6–8) — use simple vocabulary, relatable analogies, short sentences',
  high_school: 'High School (Grades 9–12) — standard academic language, some technical terms explained',
  ap_ib: 'AP/IB/A-Level — rigorous, technical, university-preparation level',
  university_intro: 'University First Year — full academic language, technical precision',
  university_advanced: 'University Advanced — graduate-level depth and technical vocabulary',
};

const SUMMARY_STYLE_INSTRUCTIONS = {
  exam_ready: `Create an "Exam-Ready" cheat sheet with:
- Bold key terms and definitions
- Bullet-point key facts (no paragraphs)
- ASCII comparison tables where relevant
- Formula boxes for any math/science content
- "⭐ EXAM TIP:" callouts for commonly tested traps
- Keep it to one dense page`,

  eli14: `Explain it using the "Explain Like I'm 14" style:
- Use real-world everyday analogies for every concept
- Zero jargon — immediately explain any technical word
- Short, punchy sentences
- Use "Think of it like..." framing
- Friendly, conversational tone`,

  teacher: `Write a full Teacher-Style lesson:
- Introduction with a hook question
- Clear learning objectives
- Main content broken into subsections
- A worked example for each concept
- Comprehension check questions at the end`,
};

function buildPrompt({ material, subject, gradeLevel, outputTypes, difficulty, summaryStyle, numQuestions }) {
  const gradeInstructions = GRADE_LABELS[gradeLevel] || GRADE_LABELS.high_school;
  const generateAll = outputTypes.includes('all');
  const types = generateAll
    ? ['flashcards', 'quiz', 'worksheet', 'summary', 'math_solver']
    : outputTypes;

  const difficultyGuide = {
    easy: 'Focus on recall, recognition, and definition-level questions.',
    mixed: 'Mix recall (40%), comprehension (40%), and application/analysis (20%) questions.',
    hard: 'Focus on analysis, application, and evaluation. Include trick questions and edge cases.',
  }[difficulty] || 'Mixed difficulty.';

  let prompt = `You are StudyVision, an expert AI study material generator. Transform the provided study material into high-quality, exam-ready study resources.

SUBJECT: ${subject}
GRADE LEVEL: ${gradeInstructions}
DIFFICULTY: ${difficultyGuide}
NUMBER OF ITEMS: ${numQuestions} per section (where applicable)

STUDY MATERIAL:
---
${material.trim()}
---

Generate the following sections. Use rich Markdown formatting. Each section should start with a clear ## header.

`;

  if (types.includes('flashcards')) {
    prompt += `
## 🃏 FLASHCARD SET

Generate exactly ${numQuestions} flashcards in this format:

---
**Card [N]**
**Q:** [Question]
**A:** [Clear, complete answer]
*Difficulty: Easy/Medium/Hard | Tag: [concept type]*

---

Rules:
- Mix definition cards, concept cards, process cards, and application cards
- At least 2 "why/how does this work?" cards (not just what)
- Match difficulty to the specified level
- Include a spaced repetition hint: *(Review again in: 1 day / 3 days / 7 days based on difficulty)*
`;
  }

  if (types.includes('quiz')) {
    prompt += `
## 📝 PRACTICE QUIZ

Generate ${numQuestions} questions (mix of multiple choice and 2-3 true/false at the end):

**Q[N].** [Question]
- A) [Option]
- B) [Option]  
- C) [Option]
- D) [Option]
✅ **Answer: [Letter]**
💡 *Explanation: [1-2 sentences explaining why this is correct and why others are wrong]*

Rules:
- Plausible distractors — wrong answers should be things a student might actually choose
- Mix recall, comprehension, and application
- True/False must have a brief justification in the answer
- End with: **Answer Key:** Q1-X | Q2-X | Q3-X ...
`;
  }

  if (types.includes('worksheet')) {
    prompt += `
## 📋 FILL-IN-THE-BLANK WORKSHEET

**Name:** _________________ **Date:** _____________ **Score:** ____/${numQuestions}

### Section A: Fill in the Blanks *(1 point each)*
Generate 10 sentences with key terms replaced by _______

### Section B: Matching *(1 point each)*
Generate 8 terms in Column A and 8 definitions in Column B (shuffled)

**Column A — Terms** | **Column B — Definitions**
[Term 1] | [Definition for a different term]
...

### Section C: Short Answer *(5 points)*
Generate 2 short-answer questions requiring 2-3 sentence answers

---
### ✅ ANSWER KEY *(detach before distributing)*
Section A answers | Section B matching answers
`;
  }

  if (types.includes('summary')) {
    const styleInstructions = SUMMARY_STYLE_INSTRUCTIONS[summaryStyle] || SUMMARY_STYLE_INSTRUCTIONS.exam_ready;
    prompt += `
## 📄 CHEAT SHEET SUMMARY

${styleInstructions}
`;
  }

  if (types.includes('math_solver')) {
    prompt += `
## 🔢 MATH / PROBLEM SOLVER

For each formula, equation, or problem in the material:
1. **Identify** the problem type
2. **Show the general formula/pattern** first
3. **Apply step-by-step** with each step numbered and labelled with the rule used
4. **Highlight the answer** clearly
5. **Show an alternative method** if one exists
6. **Generate 2 practice problems** of the same type at the end

If no math is present, create 2 logic/calculation problems based on the topic content (e.g., date math for history, probability for biology genetics).
`;
  }

  prompt += `
---
*📤 Tip: Copy any section into Google Docs, print the worksheet, or import flashcards into Anki.*
*Generated by StudyVision AI · ${subject} · ${gradeLevel.replace(/_/g, ' ')}*
`;

  return prompt;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { material } = body;

    if (!material || material.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide study material (at least a sentence or two).' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' }, { status: 500 });
    }

    const prompt = buildPrompt(body);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are StudyVision, an expert educational AI. You generate beautifully formatted, pedagogically sound study materials. Always use rich Markdown. Be thorough, accurate, and grade-appropriate. Format tables, code blocks, and math clearly.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content || '';
    return NextResponse.json({ result });
  } catch (err) {
    console.error('Generation error:', err);
    if (err?.status === 401) {
      return NextResponse.json({ error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable.' }, { status: 401 });
    }
    if (err?.status === 429) {
      return NextResponse.json({ error: 'OpenAI rate limit reached. Please wait a moment and try again.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Generation failed. Please try again in a moment.' }, { status: 500 });
  }
}
