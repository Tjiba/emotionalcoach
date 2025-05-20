"use server"

import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function analyzeEmotion(input: string) {
  try {
    const prompt = `
You are an emotional coach AI. Analyze the following text and identify:
1. The primary emotion being expressed (e.g., joy, sadness, anger, fear, etc.)
2. The intensity of the emotion (mild, moderate, intense)
3. Provide compassionate advice for handling this emotion (2-3 sentences)
4. Suggest a specific exercise or practice that would help with this emotion (3-5 sentences)

Format your response as a JSON object with the following structure:
{
  "emotion": "primary emotion",
  "intensity": "intensity level",
  "advice": "your compassionate advice",
  "exercise": "detailed exercise description"
}

User's text: "${input}"
`

    const { text } = await generateText({
      model: xai("grok-3-beta"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Parse the JSON response
    const result = JSON.parse(text)
    return result
  } catch (error) {
    console.error("Error in analyzeEmotion:", error)
    return {
      emotion: "unclear",
      intensity: "unknown",
      advice:
        "I'm having trouble understanding your emotions right now. Could you try expressing yourself differently?",
      exercise:
        "Take a few deep breaths and try to describe your feelings using 'I feel...' statements. This can help clarify your emotions.",
    }
  }
}
