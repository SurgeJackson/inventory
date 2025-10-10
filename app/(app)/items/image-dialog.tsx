'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  deleteImageById,
  updateItemUserImage,
} from '@/lib/actions/item.actions'
import { IItem } from '@/models/interfaces'

export default function ImageDialog({ selectedItem }: { selectedItem: IItem }) {
  const [isUserImageDialogOpen, setIsUserImageDialogOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
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
      if (!res.ok)
        throw new Error(json.error || 'Загрузка изображения не удалась!')
      toast.success('Изображение загружено!')

      const imageRes = await updateItemUserImage(
        selectedItem as unknown as { _id: string },
        json.id
      )
      if (!imageRes.success) {
        toast.error(imageRes.message)
      } else {
        toast.success(imageRes.message)
      }
      setIsUserImageDialogOpen(false)
    } catch (err) {
      toast.error((err as Error).message || 'Загрузка изображения не удалась!')
    } finally {
      setBusy(false)
    }
  }

  async function deleteImage() {
    const imageRes = await updateItemUserImage(
      selectedItem as unknown as { _id: string },
      ''
    )

    if (!imageRes.success) {
      toast.error(imageRes.message)
    } else {
      toast.success(imageRes.message)
    }

    const res = await deleteImageById(
      selectedItem.userImage as unknown as string
    )

    if (!res.success) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    setIsUserImageDialogOpen(false)
  }
  return (
    <>
      <Button
        className='text-xs'
        size='sm'
        variant='outline'
        onClick={() => setIsUserImageDialogOpen(true)}
      >
        Дополнительное изображение товара
      </Button>
      {isUserImageDialogOpen && (
        <Dialog
          open={isUserImageDialogOpen}
          onOpenChange={setIsUserImageDialogOpen}
        >
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Фото товара</DialogTitle>
              <DialogDescription>Прикрепите фото товара</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className='flex flex-col items-center justify-center gap-4 w-full'>
                <Input
                  type='file'
                  accept='image/*'
                  capture='environment'
                  onChange={onPick}
                />
                {preview && (
                  <Image
                    src={preview}
                    width={200}
                    height={200}
                    alt='preview'
                    className='rounded-md border object-contain max-h-56 '
                  />
                )}
                <Button
                  className='w-full'
                  onClick={upload}
                  disabled={!file || busy}
                >
                  {busy ? 'Загрузка…' : 'Загрузить'}
                </Button>
                <Button
                  className='w-full'
                  disabled={!selectedItem?.userImage}
                  onClick={deleteImage}
                >
                  Удалить
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
