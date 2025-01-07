import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'

export async function POST(request) {
  try {
    await connectDB()
    const { username, password } = await request.json()
    const user = await User.findOne({ 
      name: username,
      password: password // In production, use proper password hashing!
    })

    if (user) {
      return NextResponse.json({ status: 'success' })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

