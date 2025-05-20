"use client"

import type React from "react"

import { useState } from "react"
import { analyzeEmotion } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function EmotionalCoach() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{
    emotion: string
    intensity: string
    advice: string
    exercise: string
  } | null>(null)
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const result = await analyzeEmotion(input)
      setResponse(result)
    } catch (error) {
      console.error("Error analyzing emotion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setInput("")
    setResponse(null)
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling right now?"
            className="flex-1 py-6 text-lg transition-all duration-200 border-2 focus-visible:ring-purple-500 dark:bg-gray-900"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 dark:border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    I sense you're feeling{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {response.emotion} ({response.intensity})
                    </span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">{response.advice}</p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">Try this exercise:</h3>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-gray-800/50">{response.exercise}</div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
