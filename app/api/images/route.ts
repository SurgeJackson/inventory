import { NextResponse } from 'next/server'
import { GridFSBucket } from 'mongodb'
import { getDb } from '@/lib/mongo'
import { Readable } from 'node:stream'
import { once } from 'node:events'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const db = await getDb()
    const bucket = new GridFSBucket(db, { bucketName: 'images' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeStream = Readable.fromWeb(file.stream() as any)

    const upload = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: file.type || 'application/octet-stream',
        size: file.size,
        uploadedAt: new Date(),
      },
    })

    nodeStream.pipe(upload)
    await once(upload, 'finish')

    return NextResponse.json({ id: upload.id.toString() })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
