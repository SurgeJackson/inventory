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

export async function getAllItems(warehouse: IWarehouse) {
  await dbConnect()

  const items = await Item.find(
    { warehouse: warehouse._id },
    { name: 1, sku: 1, image: 1, category: 1, warehouse: 1, zone: 1, code: 1 }
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
    { warehouse: warehouse._id, sku: sku },
    { name: 1, sku: 1, image: 1, category: 1, warehouse: 1, zone: 1, code: 1 }
  )
    .sort({ name: 1 })
    .populate<{ category: ICategory }>('category', 'name _id')
    .populate<{ zone: IZone }>('zone', 'name _id')
    .lean<IItem[]>()

  return { items: JSON.parse(JSON.stringify(items as IItem[])) }
}

export async function getAllItemsWithImages(warehouse: IWarehouse) {
  // const uniq = <T>(arr: T[]) => Array.from(new Set(arr))

  await dbConnect()
  // const itemsNoImages = await Item.find(
  //   {
  //     warehouse: warehouse._id,
  //     $or: [{ image: { $exists: false } }, { image: '' }],
  //   },
  //   { _id: 1, sku: 1 }
  // ).lean<{ _id: mongoose.Types.ObjectId; sku: string }[]>()

  // if (itemsNoImages.length > 0) {
  //   const skuList = uniq(itemsNoImages.map((i) => i.sku).filter(Boolean))
  //   const images = await ItemImg.find(
  //     { sku: { $in: skuList } },
  //     { sku: 1, image: 1, _id: 0 }
  //   ).lean<{ sku: string; image?: string }[]>()

  //   if (images.length) {
  //     const imageBySku = new Map(
  //       images.map(({ sku, image }) => [sku, image ?? ''])
  //     )

  //     const ops = itemsNoImages
  //       .map((it) => {
  //         const img = imageBySku.get(it.sku)
  //         if (!img) return null
  //         return {
  //           updateOne: {
  //             filter: { _id: it._id },
  //             update: { $set: { image: img } },
  //           },
  //         }
  //       })
  //       .filter(Boolean) as Parameters<typeof Item.bulkWrite>[0]

  //     if (ops.length) {
  //       await Item.bulkWrite(ops, { ordered: false })
  //     }
  //   }
  // }

  return await getAllItems(warehouse)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateItemCode(item: any, code: string) {
  try {
    await dbConnect()
    const existingItem = await Item.findOne({ code: code })
    if (existingItem) throw new Error('QR-код уже используется')

    const updatedItem = await Item.findByIdAndUpdate(
      item._id,
      {
        code: code,
      },
      {
        new: true,
      }
    )
    if (!updatedItem) throw new Error('Товар не найден')

    return {
      success: true,
      message: 'QR-код успешно обновлен',
      data: JSON.parse(JSON.stringify(updatedItem)),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateItemCategory(item: any, category: string) {
  try {
    await dbConnect()
    // const updatedItem = await Item.findByIdAndUpdate(
    //   item._id,
    //   {
    //     category: category,
    //   },
    //   {
    //     new: true,
    //   }
    // )

    const updatedItems = await Item.updateMany(
      { sku: item.sku, warehouse: item.warehouse },
      { $set: { category: category } }
    ) // update all items with the same SKU and warehouse

    if (!updatedItems) throw new Error('Товар не найден')

    return {
      success: true,
      message: 'Категория Товара успешно обновлена',
      data: JSON.parse(JSON.stringify(updatedItems)),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateItemZone(item: any, zone: string) {
  try {
    await dbConnect()
    const updatedItem = await Item.findByIdAndUpdate(
      item._id,
      {
        zone: zone,
      },
      {
        new: true,
      }
    )

    if (!updatedItem) throw new Error('Товар не найден')

    return {
      success: true,
      message: 'Зона хранения Товара успешно обновлена',
      data: JSON.parse(JSON.stringify(updatedItem)),
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
export async function createItem(item: {
  name: string
  sku: string
  warehouseId: string
}) {
  try {
    await dbConnect()
    const itemImg = await ItemImg.findOne({ sku: item.sku })
    const createdItem = await Item.create({
      name: item.name,
      sku: item.sku,
      warehouse: item.warehouseId,
      image: itemImg?.image ?? '',
    })

    if (!createdItem) throw new Error('Товар не создан')

    return {
      success: true,
      message: 'Товар создан успешно',
      data: JSON.parse(JSON.stringify(createdItem)),
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

// export async function compareItems(warehouse: IWarehouse) {
//   const differences = []

//   if (warehouse?.id1c) {
//     const items1C = await get1cItems(warehouse.id1c)
//     const items1 = []

//     if (items1C?.value && items1C?.value.length !== 0) {
//       for (const item of items1C.value) {
//         items1.push({
//           sku: item['Номенклатура']['Артикул'],
//           name: item['Номенклатура']['Description'],
//           qty: item['ВНаличииBalance'],
//         })
//       }
//     }

//     await dbConnect()
//     const items2 = await Item.aggregate([
//       {
//         $match: {
//           warehouse: new Types.ObjectId(warehouse?._id.toString()),
//         },
//       },
//       {
//         $group: {
//           _id: {
//             id: '$sku',
//             name: '$name',
//           },
//           totalQuantity: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           sku: '$_id.id',
//           name: '$_id.name',
//           qty: '$totalQuantity',
//         },
//       },
//     ])

//     const map2 = new Map()

//     // Populate a map for efficient lookup in array2
//     for (const item of items2) {
//       map2.set(item.sku, item)
//     }

//     // Compare items in array1 with array2
//     for (const item1 of items1) {
//       const item2 = map2.get(item1.sku)

//       if (item2) {
//         const quantityDifference = item1.qty - item2.qty
//         if (quantityDifference !== 0) {
//           differences.push({
//             sku: item1.sku,
//             name: item1.name,
//             qty: quantityDifference,
//           })
//         }
//       } else {
//         // Item in array1 but not in array2 (consider its full quantity as a difference)
//         differences.push({ sku: item1.sku, name: item1.name, qty: item1.qty })
//       }
//     }

//     // Find items in array2 but not in array1
//     for (const item2 of items2) {
//       const foundInArray1 = items1.some((item1) => item1.sku === item2.sku)
//       if (!foundInArray1) {
//         // Item in array2 but not in array1 (consider its full quantity as a negative difference)
//         differences.push({ sku: item2.sku, name: item2.name, qty: -item2.qty })
//       }
//     }
//   }

//   return {
//     items: JSON.parse(JSON.stringify(differences)),
//   }
// }

// export async function compareItems(warehouse: IWarehouse) {
//   if (!warehouse?.id1c) return { items: [] as FlatItem[] }

//   // 1) 1C items → normalize
//   const items1C = await get1cItems(warehouse.id1c)

//   const items1: FlatItem[] = (items1C?.value ?? [])
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     .map((it: any) => ({
//       sku: String(it?.['Номенклатура']?.['Артикул'] ?? '').trim(),
//       name: String(it?.['Номенклатура']?.['Description'] ?? '').trim(),
//       qty: Number(it?.['ВНаличииBalance'] ?? 0),
//     }))
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     .filter((x: any) => x.sku) // keep only valid SKUs

//   // 2) Mongo items → aggregate per SKU
//   await dbConnect()
//   const items2 = await Item.aggregate<FlatItem>([
//     { $match: { warehouse: new Types.ObjectId(String(warehouse._id)) } },
//     {
//       $group: {
//         _id: { sku: '$sku', name: '$name' },
//         qty: { $sum: 1 }, // keep as in original logic (count docs per SKU)
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         sku: '$_id.sku',
//         name: '$_id.name',
//         qty: '$qty',
//       },
//     },
//   ])

//   const ignoreItems = await IgnoreItem.aggregate<FlatItem>([
//     { $match: { warehouse: new Types.ObjectId(String(warehouse._id)) } },
//     {
//       $group: {
//         _id: { sku: '$sku' },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         sku: '$_id.sku',
//       },
//     },
//   ])

//   // 3) Build quick lookups
//   const m1 = new Map(items1.map((x) => [x.sku, x]))
//   const m2 = new Map(items2.map((x) => [x.sku, x]))
//   const m3 = new Map(ignoreItems.map((x) => [x.sku, x]))

//   // 4) Union of all SKUs, compute differences
//   const allSkus = new Set<string>([...m1.keys(), ...m2.keys()])
//   const differences: FlatItem[] = []

//   for (const sku of allSkus) {
//     const a = m1.get(sku)
//     const b = m2.get(sku)
//     const qty1 = a?.qty ?? 0
//     const qty2 = b?.qty ?? 0
//     const delta = qty1 - qty2
//     if (delta !== 0) {
//       differences.push({
//         sku,
//         name: (a?.name ?? b?.name ?? '').trim(),
//         qty: delta,
//       })
//     }
//   }

//   // 5) Remove ignored SKUs
//   const differences2 = differences.filter((x) => !m3.has(x.sku))

//   return { items: differences2 }
// }

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
      { $match: { warehouse: wid } },
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

  const IgnoreItems = await IgnoreItem.find(
    { warehouse: warehouse._id },
    // projection keeps docs small; add/remove fields as needed
    { sku: 1, warehouse: 1 }
  )
    .sort({ sku: 1 })
    .populate<{ warehouse: IWarehouse }>('warehouse', 'name _id') // select only needed fields
    .lean<IIgnoreItem[]>()

  return { items: JSON.parse(JSON.stringify(IgnoreItems as IIgnoreItem[])) }
}

export async function createIgnoreItem(item: {
  sku: string
  warehouseId: string
}) {
  try {
    await dbConnect()
    console.log('item', item)
    const createdItem = await IgnoreItem.create({
      sku: item.sku,
      warehouse: item.warehouseId,
    })
    if (!createdItem) throw new Error('Товар не создан')

    return {
      success: true,
      message: 'Товар создан успешно',
      data: JSON.parse(JSON.stringify(createdItem)),
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

export async function deleteIgnoreItem(ignoreItemId: string) {
  try {
    await dbConnect()
    await IgnoreItem.deleteOne({ _id: ignoreItemId })

    return {
      success: true,
      message: 'Товар удален успешно',
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

export async function deleteItem(itemId: string) {
  try {
    await dbConnect()
    await Item.deleteOne({ _id: itemId })

    return {
      success: true,
      message: 'Товар удален успешно',
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
