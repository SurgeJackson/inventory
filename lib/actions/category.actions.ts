'use server'
import dbConnect from '@/lib/dbConnect'
import { ICategory } from '@/models/interfaces'
import { Category } from '@/models/models'

export async function getAllCategories() {
  await dbConnect()

  const categories = await Category.find().sort({ name: 1 })
  return {
    categories: JSON.parse(JSON.stringify(categories as ICategory[])),
  }
}

export async function updateCategory(categoryId: string, name: string) {
  try {
    await dbConnect()
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: name,
      },
      {
        new: true,
      }
    )
    if (!updatedCategory)
      throw new Error('Категория не обновлена, категория не найдена')

    return {
      success: true,
      message: 'Категория обновлена успешно',
      data: JSON.parse(JSON.stringify(updatedCategory)),
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

export async function createCategory(name: string) {
  try {
    await dbConnect()
    const createdCategory = await Category.create({
      name: name,
    })
    if (!createdCategory) throw new Error('Категория не создана')

    return {
      success: true,
      message: 'Категория создана успешно',
      data: JSON.parse(JSON.stringify(createdCategory)),
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

export async function deleteCategory(categoryId: string) {
  try {
    await dbConnect()
    await Category.deleteOne({ _id: categoryId })

    return {
      success: true,
      message: 'Категория удалена успешно',
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
