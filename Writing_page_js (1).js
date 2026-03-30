'use client';
import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const SUBJECTS = [
  { value: 'biology', label: '🧬 Biology' },
  { value: 'chemistry', label: '⚗️ Chemistry' },
  { value: 'physics', label: '⚡ Physics' },
  { value: 'mathematics', label: '📐 Mathematics' },
  { value: 'history', label: '🏛 History' },
  { value: 'geography', label: '🌍 Geography' },
  { value: 'english', label: '📖 English / Literature' },
  { value: 'computer_science', label: '💻 Computer Science' },
  { value: 'economics', label: '📊 Economics' },
  { value: 'psychology', label: '🧠 Psychology' },
  { value: 'other', label: '📚 Other' },
];

const GRADE_LEVELS = [
  { value: 'middle_school', label: 'Middle School (Grades 6–8)' },
  { value: 'high_school', label: 'High School (Grades 9–12)' },
  { value: 'ap_ib', label: 'AP / IB / A-Level' },
  { value: 'university_intro', label: 'University — First Year' },
  { value: 'university_advanced', label: 'University — Advanced' },
];

const OUTPUT_TYPES = [
  { value: 'flashcards', label: '🃏 Flashcards', desc: 'Q&A cards with difficulty ratings' },
  { value: 'quiz', label: '📝 Practice Quiz', desc: 'Multiple choice + T/F with answers' },
  { value: 'worksheet', label: '📋 Worksheet', desc: 'Fill-in-the-blank + matching' },
  { value: 'summary', label: '📄 Cheat Sheet', desc: 'One-page exam-ready summary' },
  { value: 'math_solver', label: '🔢 Math Solver', desc: 'Step-by-step solutions' },
];

const SUMMARY_STYLES = [
  { value: 'exam_ready', label: '🎯 Exam-Ready', desc: 'Key facts, bullet points, exam tips' },
  { value: 'eli14', label: '💬 Explain Like I\'m 14', desc: 'Simple language, real-world analogies' },
  { value: 'teacher', label: '🏫 Teacher-Style', desc: 'Full lesson with examples' },
];

const EXAMPLES = [
  { subject: 'biology', label: 'Biology: Mitosis & Meiosis', text: 'Chapter: Cell Division — Mitosis & Meiosis\n\nMITOSIS: Produces 2 genetically identical diploid (2n) daughter cells. Used for growth and repair.\nPhases (PMAT): Prophase — chromosomes condense, nuclear envelope breaks down. Metaphase — chromosomes align at equator. Anaphase — sister chromatids pulled to poles. Telophase — nuclear envelopes reform. Cytokinesis follows.\n\nMEIOSIS: Produces 4 genetically unique haploid (n) daughter cells (gametes). Two rounds: Meiosis I (separates homologs) and Meiosis II (separates sister chromatids).\nKey events: Crossing over occurs in Prophase I. Independent assortment at Metaphase I.\n\nKey vocab: Centromere, kinetochore, spindle fibers, synapsis, chiasma, nondisjunction.\nDisorders: Down syndrome (Trisomy 21), Turner syndrome (45,X), Klinefelter (47,XXY).' },
  { subject: 'mathematics', label: 'Math: Quadratic Equations', text: 'Quadratic Equations: ax² + bx + c = 0\n\nSolving methods:\n1. Factoring: Find two numbers that multiply to ac and add to b\n2. Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a\n3. Completing the square\n4. Graphing: x-intercepts are the solutions\n\nDiscriminant (b²-4ac):\n- Positive: 2 real solutions\n- Zero: 1 real solution (repeated)\n- Negative: 2 complex solutions (no real solutions)\n\nVertex form: y = a(x-h)² + k where (h,k) is the vertex\nStandard form: y = ax² + bx + c\n\nExample: Solve 2x² + 5x - 3 = 0\nUsing quadratic formula: x = (-5 ± √(25+24)) / 4 = (-5 ± 7) / 4\nx = 0.5 or x = -3' },
  { subject: 'history', label: 'History: World War II', text: 'World War II (1939–1945)\n\nCauses: Rise of fascism in Europe, German aggression under Hitler, Japanese expansionism in Asia, failure of appeasement policy, invasion of Poland September 1, 1939.\n\nKey Events:\n- 1939: Germany invades Poland; UK and France declare war\n- 1940: Fall of France; Battle of Britain; Dunkirk evacuation\n- 1941: Germany invades USSR (Operation Barbarossa); Japan attacks Pearl Harbor; USA enters war\n- 1942: Battle of Stalingrad; Battle of Midway (turning point in Pacific)\n- 1944: D-Day — Allied invasion of Normandy (June 6)\n- 1945: Germany surrenders (May 8 — V-E Day); Atomic bombs dropped on Hiroshima and Nagasaki; Japan surrenders (V-J Day)\n\nHolocaust: Systematic genocide of 6 million Jews and millions of others by Nazi Germany.\n\nOutcome: Allied victory; UN established; Cold War begins; decolonization accelerates; Nuremberg trials.' },
];

function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

export default function StudyPage() {
  const [material, setMaterial] = useState('');
  const [subject, setSubject] = useState('biology');
  const [gradeLevel, setGradeLevel] = useState('high_school');
  const [outputTypes, setOutputTypes] = useState(['flashcards', 'quiz']);
  const [difficulty, setDifficulty] = useState('mixed');
  const [summaryStyle, setSummaryStyle] = useState('exam_ready');
  const [numQuestions, setNumQuestions] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const LOADING_MESSAGES = [
    'Reading your notes...',
    'Identifying key concepts...',
    'Generating flashcards...',
    'Building your quiz...',
    'Writing your cheat sheet...',
    'Almost ready...',
  ];

  function toggleOutput(val) {
    setOutputTypes(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  }

  function loadExample(ex) {
    setMaterial(ex.text);
    setSubject(ex.subject);
  }

  async function handleGenerate() {
    if (!material.trim()) {
      setError('Please paste some study material first!');
      return;
    }
    if (outputTypes.length === 0) {
      setError('Please select at least one output type.');
      return;
    }
    setError('');
    setResult('');
    setLoading(true);

    let msgIndex = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const msgTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 2200);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material, subject, gradeLevel, outputTypes, difficulty, summaryStyle, numQuestions }),
      });
      clearInterval(msgTimer);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed. Please try again.');
      }
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(msgTimer);
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyvision-${subject}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">SV</div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
              Study<span className="gradient-text">Vision</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm hidden md:block">AI Study Generator</span>
            <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">← Back</Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Generate Your <span className="gradient-text">Study Pack</span>
          </h1>
          <p className="text-slate-400 text-lg">Paste any study material and let AI do the heavy lifting.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Study material */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                📋 Study Material <span className="text-coral-energy">*</span>
              </label>
              <textarea
                value={material}
                onChange={e => setMaterial(e.target.value)}
                rows={7}
                placeholder="Paste your notes, textbook text, slides, or type a topic like 'Explain the water cycle for Grade 9'..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-slate-300 text-sm placeholder-slate-600 resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-xs text-slate-500">Try an example:</span>
                {EXAMPLES.map(ex => (
                  <button key={ex.label} onClick={() => loadExample(ex)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject + Grade */}
            <div className="glass rounded-2xl p-5 border border-white/5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>📚 Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-indigo-500/60 transition-all">
                  {SUBJECTS.map(s => <option key={s.value} value={s.value} className="bg-navy">{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>🎓 Grade / Level</label>
                <select value={gradeLevel} onChange={e => setGradeLevel(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-indigo-500/60 transition-all">
                  {GRADE_LEVELS.map(g => <option key={g.value} value={g.value} className="bg-navy">{g.label}</option>)}
                </select>
              </div>
            </div>

            {/* What to generate */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>✨ What to Generate</label>
              <div className="space-y-2">
                {OUTPUT_TYPES.map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleOutput(opt.value)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${outputTypes.includes(opt.value) ? 'gradient-bg border-transparent' : 'border-white/20 group-hover:border-indigo-400/50'}`}>
                      {outputTypes.includes(opt.value) && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div onClick={() => toggleOutput(opt.value)} className="flex-1">
                      <div className="text-sm text-white">{opt.label}</div>
                      <div className="text-xs text-slate-500">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="glass rounded-2xl p-5 border border-white/5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>⚙️ Difficulty</label>
                <div className="flex gap-2">
                  {['easy', 'mixed', 'hard'].map(d => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all ${difficulty === d ? 'gradient-bg text-white' : 'glass-light text-slate-400 hover:text-white border border-white/5'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {outputTypes.includes('summary') && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>📄 Summary Style</label>
                  <div className="space-y-2">
                    {SUMMARY_STYLES.map(s => (
                      <label key={s.value} onClick={() => setSummaryStyle(s.value)}
                        className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${summaryStyle === s.value ? 'glass-light border border-indigo-500/30' : 'hover:bg-white/5'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${summaryStyle === s.value ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
                          {summaryStyle === s.value && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <div className="text-sm text-white">{s.label}</div>
                          <div className="text-xs text-slate-500">{s.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  🔢 Questions / Cards: <span className="text-indigo-400">{numQuestions}</span>
                </label>
                <input type="range" min="5" max="25" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))}
                  className="w-full accent-indigo-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5 (quick)</span><span>25 (thorough)</span>
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full gradient-bg text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-2xl glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ fontFamily: 'Sora, sans-serif' }}>
              {loading ? (
                <>
                  <LoadingDots />
                  <span className="text-sm">{loadingMsg}</span>
                </>
              ) : (
                <>✨ Generate Study Pack</>
              )}
            </button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Right: Output */}
          <div className="lg:col-span-3">
            {!result && !loading && (
              <div className="glass rounded-2xl p-10 border border-white/5 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="text-6xl mb-4 animate-float">📚</div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Your study pack will appear here</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Paste your notes on the left, pick your formats, and hit <strong className="text-indigo-400">Generate Study Pack</strong>.
                  Your complete study materials will stream in here.
                </p>
                <div className="flex gap-3 mt-6 text-2xl">
                  <span title="Flashcards">🃏</span>
                  <span title="Quiz">📝</span>
                  <span title="Worksheet">📋</span>
                  <span title="Summary">📄</span>
                  <span title="Math Solver">🔢</span>
                </div>
              </div>
            )}

            {loading && (
              <div className="glass rounded-2xl p-10 border border-indigo-500/20 h-full flex flex-col items-center justify-center text-center min-h-[400px] glow">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl animate-pulse-slow">✨</div>
                  <div className="absolute inset-0 rounded-full gradient-bg opacity-30 blur-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>AI is working its magic...</h3>
                <p className="text-indigo-300 text-sm mb-6">{loadingMsg}</p>
                <div className="w-48 bg-white/10 rounded-full h-1 overflow-hidden">
                  <div className="h-full gradient-bg rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%', width: '60%' }} />
                </div>
              </div>
            )}

            {result && (
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-white font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>Study Pack Ready ✓</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleCopy}
                      className="glass-light text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 transition-all flex items-center gap-2">
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                    <button onClick={handleDownload}
                      className="glass-light text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 transition-all flex items-center gap-2">
                      ⬇️ Download
                    </button>
                    <button onClick={() => { setResult(''); setMaterial(''); }}
                      className="text-sm text-slate-500 hover:text-white px-3 py-2 rounded-lg transition-colors">
                      New ↺
                    </button>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 max-h-[75vh] overflow-y-auto">
                  <div className="prose-studyvision">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
