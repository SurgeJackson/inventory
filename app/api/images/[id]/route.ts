// app/api/images/[id]/route.ts
import { ObjectId, GridFSBucket } from 'mongodb'
import { getDb } from '@/lib/mongo'
import { NextResponse } from 'next/server'
import { Readable } from 'node:stream'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> } // <-- params is a Promise
) {
  try {
    const { id } = await ctx.params // <-- await it

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    const db = await getDb()
    const bucket = new GridFSBucket(db, { bucketName: 'images' })

    const _id = new ObjectId(id)
    const fileDoc = await bucket.find({ _id }).next()
    if (!fileDoc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const dl = bucket.openDownloadStream(_id)
    const webStream = Readable.toWeb(dl) as unknown as ReadableStream

    return new Response(webStream, {
      headers: {
        'Content-Type':
          fileDoc.metadata?.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
}
