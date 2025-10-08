/* eslint-disable @next/next/no-img-element */
// components/image-upload.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // if you don't have one, use a plain <input>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ImageUpload() {
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [imageId, setImageId] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setImageId(null)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  async function upload() {
    if (!file) {
      toast.error('Choose an image first')
      return
    }
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/images', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Upload failed')
      setImageId(json.id)
      toast.success('Uploaded!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card className='max-w-md'>
      <CardHeader>
        <CardTitle>Upload image</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <Input type='file' accept='image/*' onChange={onPick} />
        {preview && (
          <img
            src={preview}
            alt='preview'
            className='rounded-md border object-contain max-h-56'
          />
        )}
        <Button onClick={upload} disabled={!file || busy}>
          {busy ? 'Uploading…' : 'Upload'}
        </Button>

        {imageId && (
          <div className='space-y-2'>
            <div className='text-xs text-muted-foreground break-all'>
              ID: {imageId}
            </div>
            <img
              src={`/api/images/${imageId}`}
              alt='from mongodb'
              className='rounded-md border object-contain max-h-56'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
