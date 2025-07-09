import { NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json({
      message: "Login route"
    })
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
