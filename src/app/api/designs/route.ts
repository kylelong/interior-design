import pool from '@/app/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM photos')
    return NextResponse.json(res.rows)
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  } finally {
    client.release()
  }
}
