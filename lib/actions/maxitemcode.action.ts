'use server'
import dbConnect from '@/lib/dbConnect'
import { IMaxItemCode } from '@/models/interfaces'
import { MaxItemCode } from '@/models/models'

export async function getMaxItemCode() {
  await dbConnect()

  const maxItemCode = await MaxItemCode.findOne().lean<IMaxItemCode>()

  return {
    maxItemCode: JSON.parse(JSON.stringify(maxItemCode as IMaxItemCode)),
  }
}

export async function updateMaxItemCode(
  id: string,
  {
    maxItemCode,
  }: {
    maxItemCode: string
  }
) {
  try {
    await dbConnect()
    const updatedMaxItemCode = await MaxItemCode.findByIdAndUpdate(
      id,
      {
        maxItemCode,
      },
      {
        new: true,
      }
    )
    if (!updatedMaxItemCode)
      throw new Error('MaxItemCode не обновлена, MaxItemCode не найдена')

    return {
      success: true,
      message: 'MaxItemCode обновлена успешно',
      data: JSON.parse(JSON.stringify(updatedMaxItemCode)),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message:
        typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message),
    }
  }
}
