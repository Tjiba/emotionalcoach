import EmotionalCoach from "@/components/emotional-coach"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 dark:bg-gray-950 bg-gray-50">
        <div className="container max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Emotional Coach
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Share how you're feeling, and I'll provide personalized guidance to help you navigate your emotions.
          </p>
          <EmotionalCoach />
        </div>
      </main>
    </ThemeProvider>
  )
}
