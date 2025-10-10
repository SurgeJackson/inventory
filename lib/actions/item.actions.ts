'use server'
import { ocProduct } from '@/drizzle/schema'
import dbConnect from '@/lib/dbConnect'
import {
  FlatItem,
  ICategory,
  IIgnoreItem,
  IItem,
  IWarehouse,
  IZone,
} from '@/models/interfaces'
import { IgnoreItem, Item, ItemImg } from '@/models/models'
import { drizzle } from 'drizzle-orm/mysql2'
import { get1cItems } from './1c.actions'
import { Types } from 'mongoose'
import { Schema, model } from 'mongoose'
import mongoose from 'mongoose'

import { ObjectId, GridFSBucket } from 'mongodb'
import { getDb } from '@/lib/mongo'

export async function getAllItems(warehouse: IWarehouse) {
  await dbConnect()

  const items = await Item.find(
    {
      warehouse: warehouse._id,
      $or: [{ deleted: false }, { deleted: { $exists: false } }],
    },
    {
      name: 1,
      sku: 1,
      image: 1,
      category: 1,
      warehouse: 1,
      zone: 1,
      code: 1,
      userImage: 1,
    }
  )
    .sort({ name: 1 })
    .populate<{ category: ICategory }>('category', 'name _id')
    .populate<{ zone: IZone }>('zone', 'name _id')
    .lean<IItem[]>()

  return { items: JSON.parse(JSON.stringify(items as IItem[])) }
}
export async function getAllItemsBySKU(warehouse: IWarehouse, sku: string) {
  await dbConnect()

  const items = await Item.find(
    {
      warehouse: warehouse._id,
      sku: sku,
      $or: [{ deleted: false }, { deleted: { $exists: false } }],
    },
    { name: 1, sku: 1, image: 1, category: 1, warehouse: 1, zone: 1, code: 1 }
  )
    .sort({ name: 1 })
    .populate<{ category: ICategory }>('category', 'name _id')
    .populate<{ zone: IZone }>('zone', 'name _id')
    .lean<IItem[]>()

  return { items: JSON.parse(JSON.stringify(items as IItem[])) }
}
// export async function getAllItemsWithImages(warehouse: IWarehouse) {
//   // const uniq = <T>(arr: T[]) => Array.from(new Set(arr))

//   await dbConnect()
//   // const itemsNoImages = await Item.find(
//   //   {
//   //     warehouse: warehouse._id,
//   //     $or: [{ image: { $exists: false } }, { image: '' }],
//   //   },
//   //   { _id: 1, sku: 1 }
//   // ).lean<{ _id: mongoose.Types.ObjectId; sku: string }[]>()

//   // if (itemsNoImages.length > 0) {
//   //   const skuList = uniq(itemsNoImages.map((i) => i.sku).filter(Boolean))
//   //   const images = await ItemImg.find(
//   //     { sku: { $in: skuList } },
//   //     { sku: 1, image: 1, _id: 0 }
//   //   ).lean<{ sku: string; image?: string }[]>()

//   //   if (images.length) {
//   //     const imageBySku = new Map(
//   //       images.map(({ sku, image }) => [sku, image ?? ''])
//   //     )

//   //     const ops = itemsNoImages
//   //       .map((it) => {
//   //         const img = imageBySku.get(it.sku)
//   //         if (!img) return null
//   //         return {
//   //           updateOne: {
//   //             filter: { _id: it._id },
//   //             update: { $set: { image: img } },
//   //           },
//   //         }
//   //       })
//   //       .filter(Boolean) as Parameters<typeof Item.bulkWrite>[0]

//   //     if (ops.length) {
//   //       await Item.bulkWrite(ops, { ordered: false })
//   //     }
//   //   }
//   // }

//   return await getAllItems(warehouse)
// }
export async function updateItemCode(
  item: { _id: string } | string,
  code: string
) {
  try {
    await dbConnect()
    const id = typeof item === 'string' ? item : item._id
    const value = code?.trim() ?? ''

    if (value) {
      const exists = await Item.exists({ code: value, _id: { $ne: id } })
      if (exists) throw new Error('QR-код уже используется')
    }

    const doc = await Item.findByIdAndUpdate(
      id,
      { code: value },
      { new: true }
    ).lean<IItem | null>()
    if (!doc) throw new Error('Товар не найден')

    return { success: true, message: 'QR-код успешно обновлён' }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка обновления',
    }
  }
}

export async function updateItemCategory(
  item: { sku: string; warehouse: string },
  category: string
) {
  try {
    await dbConnect()
    const { matchedCount, modifiedCount } = await Item.updateMany(
      { sku: item.sku, warehouse: item.warehouse },
      { $set: { category } }
    )

    if (!matchedCount) throw new Error('Товар не найден')

    return {
      success: true,
      message: modifiedCount ? 'Категория обновлена' : 'Без изменений',
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка обновления',
    }
  }
}

export async function updateItemZone(
  item: { _id: string } | string,
  zone: string
) {
  try {
    await dbConnect()
    const id = typeof item === 'string' ? item : item._id

    const doc = await Item.findByIdAndUpdate(
      id,
      { zone },
      { new: true }
    ).lean<IItem | null>()

    if (!doc) throw new Error('Товар не найден')

    return {
      success: true,
      message: 'Зона хранения обновлена',
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка обновления',
    }
  }
}

export async function updateItemUserImage(
  item: { _id: string } | string,
  image: string
) {
  try {
    await dbConnect()
    const id = typeof item === 'string' ? item : item._id

    const doc = await Item.findByIdAndUpdate(
      id,
      { userImage: image },
      { new: true }
    ).lean<IItem | null>()

    if (!doc) throw new Error('Товар не найден')

    return {
      success: true,
      message: 'Изображение товара обновлено',
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка обновления',
    }
  }
}

export async function createItem({
  name,
  sku,
  warehouseId,
}: {
  name: string
  sku: string
  warehouseId: string
}) {
  try {
    await dbConnect()
    const img = await ItemImg.findOne({ sku })
      .select('image')
      .lean<{ image?: string }>()
    const doc = await Item.create({
      name,
      sku,
      warehouse: warehouseId,
      image: img?.image ?? '',
    })
    return {
      success: true,
      message: 'Товар создан успешно',
      data: JSON.parse(JSON.stringify(doc)),
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка создания',
    }
  }
}

export async function compareItems(warehouse: IWarehouse) {
  if (!warehouse?.id1c) return { items: [] as FlatItem[] }

  // 1) 1C → normalize then aggregate by SKU
  const items1C = await get1cItems(warehouse.id1c)
  const items1Raw: FlatItem[] = (items1C?.value ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((it: Record<string, any>) => ({
      sku: String(it?.['Номенклатура']?.['Артикул'] ?? '').trim(),
      name: String(it?.['Номенклатура']?.['Description'] ?? '').trim(),
      qty: Number(it?.['ВНаличииBalance'] ?? 0),
    }))
    .filter((x: { sku: string }) => !!x.sku)

  // aggregate same SKU (sum quantities, keep first non-empty name)
  const bySku1 = new Map<string, FlatItem>()
  for (const r of items1Raw) {
    const prev = bySku1.get(r.sku)
    if (!prev) bySku1.set(r.sku, r)
    else
      bySku1.set(r.sku, {
        sku: r.sku,
        name: prev.name || r.name,
        qty: prev.qty + r.qty,
      })
  }

  // 2) Mongo queries (parallel)
  await dbConnect()
  const wid = new Types.ObjectId(String(warehouse._id))

  const [items2, ignoreRows] = await Promise.all([
    Item.aggregate<FlatItem>([
      {
        $match: {
          warehouse: wid,
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
        },
      },
      {
        $group: {
          _id: { sku: '$sku', name: '$name' },
          qty: { $sum: 1 },
        },
      },
      { $project: { _id: 0, sku: '$_id.sku', name: '$_id.name', qty: '$qty' } },
    ]),
    IgnoreItem.aggregate<{ sku: string }>([
      { $match: { warehouse: wid } },
      { $group: { _id: { sku: '$sku' } } },
      { $project: { _id: 0, sku: '$_id.sku' } },
    ]),
  ])

  const bySku2 = new Map(items2.map((x) => [x.sku, x] as const))
  const ignored = new Set(ignoreRows.map((x) => x.sku))

  if (bySku1.size === 0 && bySku2.size === 0) return { items: [] as FlatItem[] }

  // 3) Union SKUs, compute deltas, drop ignored
  const allSkus = new Set<string>([...bySku1.keys(), ...bySku2.keys()])
  const differences: FlatItem[] = []

  for (const sku of allSkus) {
    if (ignored.has(sku)) continue

    const a = bySku1.get(sku)
    const b = bySku2.get(sku)
    const qty1 = a?.qty ?? 0
    const qty2 = b?.qty ?? 0
    const delta = qty1 - qty2

    if (delta !== 0) {
      differences.push({
        sku,
        name: (a?.name ?? b?.name ?? '').trim(),
        qty: delta,
      })
    }
  }

  return { items: differences }
}

export async function copyImages() {
  const db = drizzle(process.env.DATABASE_URL!)

  const images = await db
    .select({
      productId: ocProduct.productId,
      sku: ocProduct.sku,
      image: ocProduct.image,
    })
    .from(ocProduct)

  await dbConnect()

  // Minimal Item schema (adapt to your real one)
  const ItemImgSchema = new Schema({
    productId: { type: Number, index: true },
    sku: { type: String, index: true, unique: true },
    image: String, // URL or relative path
    imageCopiedAt: Date, // bookkeeping
  })

  const ItemImg = mongoose.models.ItemImg ?? model('ItemImg', ItemImgSchema)

  async function upsertImageUrls(
    images: Array<{ productId: number; sku: string; image: string | null }>
  ) {
    const ops = images.map(({ productId, sku, image }) => ({
      updateOne: {
        filter: { sku },
        update: {
          $set: { productId, image, imageCopiedAt: new Date() },
        },
        upsert: true,
      },
    }))

    if (ops.length) {
      await ItemImg.bulkWrite(ops, { ordered: false })
    }
  }
  await upsertImageUrls(images)
  console.log('Image URLs copied to Mongo.')
}

export async function getAllIgnoreItems(warehouse: IWarehouse) {
  await dbConnect()
  const items = await IgnoreItem.find({ warehouse: warehouse._id })
    .select('sku warehouse')
    .sort('sku')
    .populate<{ warehouse: IWarehouse }>('warehouse', 'name _id')
    .lean<IIgnoreItem[]>()

  return { items: JSON.parse(JSON.stringify(items as IIgnoreItem[])) }
}

export async function createIgnoreItem({
  sku,
  warehouseId,
}: {
  sku: string
  warehouseId: string
}) {
  try {
    await dbConnect()
    const doc = await IgnoreItem.create({ sku, warehouse: warehouseId })
    if (!doc) throw new Error('Товар не создан')
    return {
      success: true,
      message: 'Товар создан успешно',
      data: JSON.parse(JSON.stringify(doc)),
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка создания',
    }
  }
}

export async function deleteIgnoreItem(id: string) {
  try {
    await dbConnect()
    const { deletedCount } = await IgnoreItem.deleteOne({ _id: id })
    if (!deletedCount) throw new Error('Товар не найден')
    return { success: true, message: 'Товар удалён успешно' }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка удаления',
    }
  }
}

export async function deleteItem(itemId: string) {
  try {
    await dbConnect()
    const { matchedCount } = await Item.updateOne(
      { _id: itemId },
      { $set: { deleted: true } }
    )
    if (!matchedCount) throw new Error('Товар не найден')
    return { success: true, message: 'Товар удалён успешно' }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка удаления',
    }
  }
}

export async function getItemsCodeQty(warehouse: IWarehouse) {
  await dbConnect()

  const items = await Item.aggregate([
    {
      $match: {
        warehouse: new Types.ObjectId(String(warehouse._id)),
        deleted: { $ne: true },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        nonEmpty: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: [{ $type: '$code' }, 'string'] },
                  { $gt: [{ $strLenCP: { $trim: { input: '$code' } } }, 0] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        nonEmpty: 1,
        emptyOrMissing: { $subtract: ['$total', '$nonEmpty'] },
      },
    },
  ])

  return { items }
}

export async function deleteImageById(id: string, bucketName = 'images') {
  try {
    if (!ObjectId.isValid(id)) throw new Error('Invalid id')

    const db = await getDb()
    const bucket = new GridFSBucket(db, { bucketName })
    const _id = new ObjectId(id)

    const exists = await bucket.find({ _id }).hasNext()
    if (!exists) throw new Error('Изображение товара не найдено')

    await bucket.delete(_id)
    return { success: true, message: 'Изображение товара удалёно успешно' }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Ошибка удаления',
    }
  }
}
