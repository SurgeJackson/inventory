'use server'
import dbConnect from '@/lib/dbConnect'
import { ISaleLog } from '@/models/interfaces'
import { SaleLog } from '@/models/models'

export async function getAllSaleLogs() {
  await dbConnect()

  const saleLogs = await SaleLog.find()
  return {
    saleLogs: JSON.parse(JSON.stringify(saleLogs as ISaleLog[])),
  }
}

export async function getSaleLog(saleKey: string) {
  await dbConnect()

  const saleLog = await SaleLog.findOne({ saleKey }).lean<ISaleLog>()
  return {
    saleLog: JSON.parse(JSON.stringify(saleLog as ISaleLog)),
  }
}

export async function updateSaleLog(
  saleLogId: string,
  { saleKey, updateDate }: { saleKey: string; updateDate: Date }
) {
  try {
    await dbConnect()
    const updatedSaleLog = await SaleLog.findByIdAndUpdate(
      saleLogId,
      {
        saleKey: saleKey,
        updateDate: updateDate,
      },
      {
        new: true,
      }
    )
    if (!updatedSaleLog)
      throw new Error('Sale Log не обновлен, Sale Log не найден')

    return {
      success: true,
      message: 'Sale Log обновлен успешно',
      data: JSON.parse(JSON.stringify(updatedSaleLog)),
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

export async function createSaleLog({
  saleKey,
  updateDate,
}: {
  saleKey: string
  updateDate: Date
}) {
  try {
    await dbConnect()
    const createdSaleLog = await SaleLog.create({
      saleKey,
      updateDate,
    })
    if (!createdSaleLog) throw new Error('Sale Log не создан')

    return {
      success: true,
      message: 'Sale Log создан успешно',
      data: JSON.parse(JSON.stringify(createdSaleLog)),
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

export async function deleteSaleLog(saleLogId: string) {
  try {
    await dbConnect()
    await SaleLog.deleteOne({ _id: saleLogId })

    return {
      success: true,
      message: 'Sale Log удален успешно',
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
