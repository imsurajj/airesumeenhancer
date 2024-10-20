import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant that enhances resumes. Analyze the given resume and provide suggestions to improve its content, structure, and impact. Focus on highlighting key achievements, using action verbs, and tailoring the resume to industry standards.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}