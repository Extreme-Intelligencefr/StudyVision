'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const NAV_LINKS = ['Features', 'How It Works', 'Pricing', 'FAQ'];

const FEATURES = [
  {
    icon: '🃏',
    title: 'Smart Flashcards',
    desc: 'Auto-generated Q&A cards with difficulty rankings and spaced repetition so you remember more with less effort.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: '📝',
    title: 'Practice Quizzes',
    desc: 'Multiple choice, true/false, and short answer questions with instant feedback and detailed explanations.',
    color: 'from-sky-400 to-cyan-600',
  },
  {
    icon: '📋',
    title: 'Fill-in-the-Blank Worksheets',
    desc: 'Printable or digital worksheets with matching activities and short answer sections — perfect for exam prep.',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    icon: '📄',
    title: 'Cheat-Sheet Summaries',
    desc: '"Exam-Ready" bullet notes, "Explain Like I\'m 14" mode, or full Teacher-Style lesson breakdowns.',
    color: 'from-cyan-400 to-sky-600',
  },
  {
    icon: '🔢',
    title: 'Math Solver',
    desc: 'Step-by-step solutions for any math problem with alternate methods, pattern recognition, and practice problems.',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    icon: '🤖',
    title: 'AI Tutor Chat',
    desc: 'Ask anything, anytime. Your 24/7 personal tutor explains concepts with real-world analogies in plain language.',
    color: 'from-rose-400 to-pink-600',
  },
];

const STEPS = [
  { num: '01', title: 'Paste Your Notes', desc: 'Paste any text — notes, textbook excerpts, slides, or just type a topic you want to study.', icon: '📋' },
  { num: '02', title: 'Pick Your Format', desc: 'Choose flashcards, quiz, worksheet, summary, math solver — or generate all at once.', icon: '⚙️' },
  { num: '03', title: 'AI Does the Work', desc: 'Our AI reads your material and generates a complete, ready-to-study pack in under 15 seconds.', icon: '✨' },
  { num: '04', title: 'Study & Ace It', desc: 'Review, download, print, or share your study materials. Come back to review with spaced repetition.', icon: '🎯' },
];

const TESTIMONIALS = [
  { name: 'Maya R.', grade: 'Grade 11, Toronto', text: 'I used to spend 2 hours making flashcards. Now it takes 10 seconds. My grades went from 72% to 91% in one semester.', avatar: 'M' },
  { name: 'Ethan K.', grade: 'University, Austin TX', text: 'The math solver is unreal. It actually explains WHY each step works, not just spits out an answer. Game changer for calc.', avatar: 'E' },
  { name: 'Mr. Collins', grade: 'High School Teacher, Melbourne', text: 'I generated a full 20-question test with answer key from my lesson PDF in 60 seconds. My department is obsessed.', avatar: 'C' },
];

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect to try it out',
    features: ['5 uploads per month', '20 flashcards per set', '1 quiz per upload', 'Basic summary mode', 'AI Tutor (10 messages/day)'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$7.99',
    period: '/month',
    desc: 'For serious students',
    features: ['Unlimited uploads', 'Unlimited flashcards & quizzes', 'All summary modes', 'PDF export', 'No ads', 'Priority AI processing'],
    cta: 'Start Premium',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Tutor Pro',
    price: '$14.99',
    period: '/month',
    desc: 'Ultimate study power',
    features: ['Everything in Premium', 'Unlimited AI Tutor', 'Voice tutor mode', 'Math Solver (unlimited)', 'Test simulation mode', 'Personalized study plans'],
    cta: 'Go Pro',
    highlight: false,
  },
];

const FAQS = [
  { q: 'What subjects does StudyVision support?', a: 'StudyVision works for any subject — Biology, Chemistry, Physics, Math, History, English, Computer Science, Economics, Psychology, and more. If you can paste the text, we can generate study materials from it.' },
  { q: 'Do I need to create an account?', a: 'You can try the app without an account (limited to 3 generations). Creating a free account unlocks 5 uploads/month and saves your study sets.' },
  { q: 'How good is the AI at understanding my notes?', a: 'Very good. StudyVision uses GPT-4o, the same AI that powers ChatGPT. It understands context, identifies key concepts, and generates relevant questions — not just keyword matches.' },
  { q: 'Can teachers use this for their class?', a: 'Absolutely. Teachers can generate worksheets, quizzes, and answer keys from lesson materials in seconds. We offer a Teacher/School plan with class management features.' },
  { q: 'Can I export or print my study materials?', a: 'Yes! Premium users can export everything as a PDF. Free users can copy the content. Print-friendly worksheet formatting is built in.' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">SV</div>
          <span className="font-sora font-700 text-lg text-white" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>
            Study<span className="gradient-text">Vision</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/study" className="hidden md:block text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Sign In
          </Link>
          <Link href="/study"
            className="gradient-bg text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
            style={{ fontFamily: 'Sora, sans-serif' }}>
            Try Free →
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState('');
  const fullText = 'Upload anything. Learn everything.';
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="relative glass-light rounded-full px-4 py-2 mb-8 flex items-center gap-2">
        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">✦ AI-Powered Study Tool</span>
      </div>

      {/* Headline */}
      <h1 className="relative text-center text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl"
        style={{ fontFamily: 'Sora, sans-serif' }}>
        Turn your notes into{' '}
        <span className="gradient-text">study superpowers</span>
      </h1>

      {/* Typewriter */}
      <p className="relative text-xl md:text-2xl text-sky-300 font-medium mb-6 h-8" style={{ fontFamily: 'Sora, sans-serif' }}>
        {typed}<span className="animate-pulse">|</span>
      </p>

      <p className="relative text-center text-slate-400 text-lg mb-10 max-w-2xl leading-relaxed">
        Paste any notes, textbook text, or topic — and StudyVision instantly generates{' '}
        <strong className="text-white">flashcards, quizzes, worksheets, and summaries</strong> powered by AI.
        Like Quizlet + Photomath + ChatGPT in one.
      </p>

      {/* CTAs */}
      <div className="relative flex flex-col sm:flex-row gap-4 mb-16">
        <Link href="/study"
          className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-2xl glow flex items-center gap-2"
          style={{ fontFamily: 'Sora, sans-serif' }}>
          ✨ Generate Study Pack Free
        </Link>
        <a href="#how-it-works"
          className="glass text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all flex items-center gap-2">
          ▶ See How It Works
        </a>
      </div>

      {/* Social proof */}
      <div className="relative flex items-center gap-6 mb-16 flex-wrap justify-center">
        <div className="flex -space-x-3">
          {['M', 'E', 'S', 'J', 'P'].map((l, i) => (
            <div key={i} className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold border-2 border-navy">
              {l}
            </div>
          ))}
        </div>
        <div className="text-slate-400 text-sm">
          <span className="text-white font-semibold">10,000+</span> students studying smarter
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
          <span className="text-slate-400 text-sm ml-1">4.9/5</span>
        </div>
      </div>

      {/* App preview card */}
      <div className="relative w-full max-w-2xl glass rounded-2xl p-6 border border-white/10 glow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-slate-500 text-xs ml-2">studyvision.app/study</span>
        </div>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-slate-500 mb-1">Study Material</div>
            <div className="text-sm text-slate-300">Chapter 4: Mitosis — Cell division producing 2 identical daughter cells. Phases: Prophase, Metaphase, Anaphase, Telophase...</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['🃏 Flashcards', '📝 Quiz', '📋 Worksheet', '📄 Summary'].map(tag => (
              <span key={tag} className="glass-light text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30">{tag}</span>
            ))}
          </div>
          <div className="gradient-bg rounded-lg p-3 text-center">
            <div className="text-white font-semibold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>✨ Generating your study pack...</div>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="glass-light inline-flex rounded-full px-4 py-2 mb-4">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Everything You Need</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Six tools. One <span className="gradient-text">upload.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop switching between apps. StudyVision generates every study format you need from a single paste.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 card-hover border border-white/5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="glass-light inline-flex rounded-full px-4 py-2 mb-4">
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Dead Simple</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            From notes to <span className="gradient-text">ready to study</span>
            <br />in 15 seconds
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent z-10 -translate-y-1/2" style={{ width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)' }} />
              )}
              <div className="glass rounded-2xl p-6 text-center card-hover border border-white/5 h-full">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="text-xs font-bold text-indigo-400 mb-2 tracking-widest">{step.num}</div>
                <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/study"
            className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-2xl glow inline-flex items-center gap-2"
            style={{ fontFamily: 'Sora, sans-serif' }}>
            Try It Now — It's Free →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Students & teachers <span className="gradient-text">love it</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 border border-white/5 card-hover">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="glass-light inline-flex rounded-full px-4 py-2 mb-4">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Start free. <span className="gradient-text">Upgrade when ready.</span>
          </h2>
          <p className="text-slate-400 text-lg">No credit card required. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((plan) => (
            <div key={plan.name}
              className={`rounded-2xl p-6 flex flex-col relative ${plan.highlight ? 'gradient-bg shadow-2xl glow' : 'glass border border-white/5'} card-hover`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-navy text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {plan.badge}
                </div>
              )}
              <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-white/70' : 'text-indigo-400'}`}>{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-slate-500'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/70' : 'text-slate-400'}`}>{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 ${plan.highlight ? 'text-white' : 'text-indigo-400'}`}>✓</span>
                    <span className={plan.highlight ? 'text-white/90' : 'text-slate-300'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/study"
                className={`text-center py-3 rounded-full font-semibold text-sm transition-all ${plan.highlight ? 'bg-white text-indigo-600 hover:bg-white/90' : 'glass-light text-white hover:bg-white/10 border border-indigo-500/30'}`}
                style={{ fontFamily: 'Sora, sans-serif' }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
                <span className="text-white font-medium text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{faq.q}</span>
                <span className={`text-indigo-400 text-lg transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="glass rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-sky-500/20 pointer-events-none" />
          <div className="relative">
            <div className="text-5xl mb-6">📚</div>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to study <span className="gradient-text">smarter?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ students who turned their chaotic notes into exam-winning study packs — in seconds.
            </p>
            <Link href="/study"
              className="gradient-bg text-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-2xl glow inline-flex items-center gap-2"
              style={{ fontFamily: 'Sora, sans-serif' }}>
              ✨ Start For Free — No Credit Card
            </Link>
            <p className="text-slate-500 text-sm mt-4">5 free generations · No signup required to try</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-xs">SV</div>
          <span className="text-white font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>StudyVision</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
          <a href="mailto:hello@studyvision.app" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-slate-600 text-sm">© 2026 StudyVision. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
