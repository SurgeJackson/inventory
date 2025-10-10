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

    const contentType =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fileDoc as any)?.metadata?.contentType ?? 'application/octet-stream'

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': 'inline',
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (fileDoc as any).length === 'number') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers['Content-Length'] = String((fileDoc as any).length)
    }

    return new Response(webStream, { headers })
  } catch {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
}
