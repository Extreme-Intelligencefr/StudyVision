import './globals.css';

export const metadata = {
  title: 'StudyVision — Upload anything. Learn everything.',
  description: 'AI-powered study tool that transforms any school material into flashcards, quizzes, worksheets, and summaries in seconds.',
  keywords: 'AI study tool, flashcards, quiz generator, study notes, exam prep',
  openGraph: {
    title: 'StudyVision — AI Study Tool',
    description: 'Turn any notes into flashcards, quizzes & summaries with AI instantly.',
    url: 'https://studyvision.app',
    siteName: 'StudyVision',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
