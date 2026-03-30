# 📚 StudyVision — AI Study Material Generator

> Turn any notes into flashcards, quizzes, worksheets & summaries with AI.

## 🚀 Deploy to Vercel in 5 Steps

### Step 1 — Get Your OpenAI API Key
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-...`) — save it somewhere safe

### Step 2 — Upload to GitHub
1. Go to [github.com](https://github.com) → sign up/in → click **"New repository"**
2. Name it `studyvision`, set to **Public**, click **"Create repository"**
3. On your computer, open Terminal (Mac) or Command Prompt (Windows)
4. Run these commands:
```bash
cd /home/user/studyvision
git init
git add .
git commit -m "Initial StudyVision commit"
git remote add origin https://github.com/YOUR_USERNAME/studyvision.git
git push -u origin main
```

### Step 3 — Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → sign up with GitHub
2. Click **"Add New Project"** → Import your `studyvision` repository
3. Leave all settings as default
4. Click **"Deploy"** — Vercel will build it automatically ✓

### Step 4 — Add Your OpenAI API Key
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-your-key-here`
3. Click **Save**
4. Go to **Deployments** → click the 3 dots on your latest deploy → **Redeploy**

### Step 5 — You're Live! 🎉
Your site is now live at `https://studyvision-xxx.vercel.app`

---

## 🖥 Run Locally (Optional)

```bash
# 1. Install dependencies
cd /home/user/studyvision
npm install

# 2. Create your env file
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
studyvision/
├── app/
│   ├── page.js           ← Landing page
│   ├── layout.js         ← HTML wrapper + fonts
│   ├── globals.css       ← Global styles
│   ├── study/
│   │   └── page.js       ← Study generator app
│   └── api/
│       └── generate/
│           └── route.js  ← OpenAI API route
├── .env.example          ← Copy to .env.local
├── .gitignore
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## ✏️ Customizing

| What to change | Where |
|---|---|
| Colors / branding | `app/globals.css` + `tailwind.config.js` |
| Landing page text | `app/page.js` |
| Subjects / grade levels | `app/study/page.js` — top arrays |
| AI prompt / output quality | `app/api/generate/route.js` |
| Pricing | `app/page.js` — PRICING array |
| Meta tags / SEO | `app/layout.js` |

---

## 💡 Want to Add More Features?

- **Auth (login/signup):** Add [Supabase Auth](https://supabase.com) or [Clerk](https://clerk.com)
- **Save study sets:** Connect [Supabase](https://supabase.com) database
- **Payments:** Add [Stripe](https://stripe.com) checkout
- **File upload:** Use [UploadThing](https://uploadthing.com) for PDF/image uploads

---

Built with Next.js 14, Tailwind CSS, and OpenAI GPT-4o.
