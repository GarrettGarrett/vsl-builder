'use server'

import { revalidatePath } from 'next/cache'

export async function sendFeedback(feedback: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('Discord webhook URL is not configured')
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New feedback received from VSL Builder:\n${feedback}`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send feedback to Discord')
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error sending feedback:', error)
    return { success: false, error: 'Failed to send feedback' }
  }
}