'use server'
import dbConnect from '@/lib/dbConnect'
import { IWarehouse, IZone } from '@/models/interfaces'
import { Zone } from '@/models/models'

export async function getAllZones(warehouse: IWarehouse) {
  await dbConnect()

  const zones = await Zone.find(
    { warehouse: warehouse._id },
    { name: 1, warehouse: 1 }
  )
    .sort({ name: 1 })
    .populate<{ warehouse: IZone }>('warehouse', 'name _id') // select only needed fields
    .lean<IZone[]>()

  return { zones: JSON.parse(JSON.stringify(zones as IZone[])) }
}

export async function createZone(name: string, warehouse: IWarehouse) {
  try {
    await dbConnect()
    const createdZone = await Zone.create({
      name: name,
      warehouse: warehouse,
    })
    if (!createdZone) throw new Error('Зона хранения не создана')

    return {
      success: true,
      message: 'Зона хранения создана успешно',
      data: JSON.parse(JSON.stringify(createdZone)),
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

export async function updateZone(
  zoneId: string,
  {
    name,
    warehouse,
  }: {
    name: string
    warehouse: IWarehouse
  }
) {
  try {
    await dbConnect()
    const updatedZone = await Zone.findByIdAndUpdate(
      zoneId,
      {
        name: name,
        warehouse: warehouse,
      },
      {
        new: true,
      }
    )
    if (!updatedZone)
      throw new Error('Зона хранения не обновлена, Зона хранения не найдена')

    return {
      success: true,
      message: 'Зона хранения обновлена успешно',
      data: JSON.parse(JSON.stringify(updatedZone)),
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

export async function deleteZone(zoneId: string) {
  try {
    await dbConnect()
    await Zone.deleteOne({ _id: zoneId })

    return {
      success: true,
      message: 'Зона хранения удалена успешно',
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
