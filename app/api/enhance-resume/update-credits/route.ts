import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { credits } = await req.json()

  // Here you would update the user's credits in your database
  // For this example, we'll just return the new credit amount
  const newCredits = Math.max(0, credits - 1)

  return NextResponse.json({ credits: newCredits })
}