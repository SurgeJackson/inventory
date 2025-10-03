'use server'
import dbConnect from '@/lib/dbConnect'
import { IWarehouse } from '@/models/interfaces'
import { Warehouse } from '@/models/models'

export async function getAllWarehouses() {
  await dbConnect()

  const warehouses = await Warehouse.find()
  return {
    warehouses: JSON.parse(JSON.stringify(warehouses as IWarehouse[])),
  }
}

export async function updateWarehouse(
  warehouseId: string,
  { name, id1c }: { name: string; id1c: string }
) {
  try {
    await dbConnect()
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      warehouseId,
      {
        name: name,
        id1c: id1c,
      },
      {
        new: true,
      }
    )
    if (!updatedWarehouse) throw new Error('Склад не обновлен, склад не найден')

    return {
      success: true,
      message: 'Склад обновлен успешно',
      data: JSON.parse(JSON.stringify(updatedWarehouse)),
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

export async function createWarehouse({
  name,
  id1c,
}: {
  name: string
  id1c: string
}) {
  try {
    await dbConnect()
    const createdWarehouse = await Warehouse.create({
      name: name,
      id1c: id1c,
    })
    if (!createdWarehouse) throw new Error('Склад не создан')

    return {
      success: true,
      message: 'Склад создан успешно',
      data: JSON.parse(JSON.stringify(createdWarehouse)),
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

export async function deleteWarehouse(warehouseId: string) {
  try {
    await dbConnect()
    await Warehouse.deleteOne({ _id: warehouseId })

    return {
      success: true,
      message: 'Склад удален успешно',
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
