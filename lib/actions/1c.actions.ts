'use server'
import { getBuhOrganization } from './organization.action'
import { createSaleLog } from './saleLog.action'

export async function get1cItems(warehouseId: string) {
  const username = process.env.USERNAME_1C!
  const password_raw = process.env.PASSWORD_1C!

  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )

  const url =
    process.env.URL_1C +
    "AccumulationRegister_СвободныеОстатки/Balance(Dimensions='Номенклатура, Склад')?&$format=json&$expand=Склад,Номенклатура&$select=Склад/Ref_Key,Склад/Description,ВНаличииBalance,Номенклатура/Артикул,Номенклатура/Description,Номенклатура/Ref_Key&$filter=Склад_Key eq guid'" +
    warehouseId +
    "'&$orderby=ВНаличииBalance desc"

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export async function get1CSales(startDate: string, endDate: string) {
  const username = process.env.USERNAME_1C!
  const password_raw = process.env.PASSWORD_1C!

  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )

  const url =
    "http://office.gnezdoproject.ru/sturmproject/odata/standard.odata/Document_РеализацияТоваровУслуг?&$format=json&$orderby=Date desc&$expand=Менеджер, Подразделение, Организация, Партнер, Контрагент, Склад,&$select=Организация/Description, Организация/Ref_Key, Партнер/Description, Контрагент/Description, Контрагент/ИНН, Менеджер/Description, Подразделение/Description, Number, Date, СуммаДокумента, Товары/LineNumber, Товары/Номенклатура_Key, Товары/Количество, Товары/Цена, Товары/Сумма, Товары/СтавкаНДС, Товары/СуммаНДС, Товары/СуммаСНДС, Склад/Description, Ref_Key,Статус, СпособДоставки, DataVersion, Posted, DeletionMark&$filter=Date gt datetime'" +
    startDate +
    'T00:00:00' +
    "' and Date lt datetime'" +
    endDate +
    'T23:59:59' +
    "'"

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return data.value
}

export async function getBuhClient(name: string = '', inn: string = '') {
  const username = process.env.USERNAME_1CBUH!
  const password_raw = process.env.PASSWORD_1CBUH!
  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )
  const filter = inn ? `ИНН eq '${inn}'` : `НаименованиеПолное eq '${name}'`
  const url =
    'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_Контрагенты?$format=json&$select=Ref_Key,Description,ИНН,НаименованиеПолное&$filter=' +
    filter
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  if (data.value.length === 0) {
    const newClient = await fetch(
      'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_Контрагенты?$format=json',
      {
        method: 'POST',
        body: JSON.stringify({
          Description: name,
          ЮридическоеФизическоеЛицо: inn ? 'ЮридическоеЛицо' : 'ФизическоеЛицо',
          ИНН: inn,
          НаименованиеПолное: name,
        }),
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!newClient.ok) {
      throw new Error('Failed to fetch data')
    }
    const newClientData = await newClient.json()
    return newClientData
  } else return data?.value[0]
}

export async function getTorgItem(guid: string) {
  const username = process.env.USERNAME_1C!
  const password_raw = process.env.PASSWORD_1C!

  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )

  const url =
    process.env.URL_1C + "Catalog_Номенклатура(guid'" + guid + "')?$format=json"

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export async function getBuhItem(sku: string) {
  const username = process.env.USERNAME_1CBUH!
  const password_raw = process.env.PASSWORD_1CBUH!
  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )

  const filter = `Code eq '${sku}'`
  const url =
    'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_Номенклатура?$format=json&&$filter=' +
    filter

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getItemCodes(sale: any) {
  const items = []
  for (const item of sale.Товары) {
    const skuTorg = await getTorgItem(item.Номенклатура_Key)
    const skuBuh = await getBuhItem(skuTorg.Code)
    items.push({
      ...item,
      Номенклатура_Key: skuBuh.value[0].Ref_Key,
    })
  }
  return items
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBuhSale(sale: any) {
  try {
    const username = process.env.USERNAME_1CBUH!
    const password_raw = process.env.PASSWORD_1CBUH!
    const credentials = Buffer.from(`${username}:${password_raw}`).toString(
      'base64'
    )

    const org = await getBuhOrganization(sale.Организация.Ref_Key)
    const client = await getBuhClient(
      sale.Контрагент.Description,
      sale.Контрагент.ИНН
    )

    const items = await getItemCodes(sale)

    const raw = JSON.stringify({
      Number: sale.Number,
      Date: sale.Date,
      Склад_Key: '1812c4dd-56a3-11e3-99b0-0025900d739a',
      Организация_Key: org.organization.buhKey,
      Контрагент_Key: client.Ref_Key,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Товары: items.map((item: any) => ({
        Номенклатура_Key: item.Номенклатура_Key,
        LineNumber: item.LineNumber.toString(),
        Количество: item.Количество.toString(),
        Цена: item.Цена.toString(),
        Сумма: item.Сумма.toString(),
        СтавкаНДС: item.СтавкаНДС.toString(),
        СуммаНДС: item.СуммаНДС.toString(),
        СуммаСНДС: item.СуммаСНДС.toString(),
      })),
    })

    const res = await fetch(
      'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Document_РеализацияТоваровУслуг?$format=json',
      {
        method: 'POST',
        body: raw,
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!res.ok) {
      throw new Error('Ошибка при переносе реализации')
    }
    const data = await res.json()
    console.log(sale)
    const createdSaleLog = await createSaleLog({
      saleKey: sale.Ref_Key,
      updateDate: new Date(),
    })

    if (!createdSaleLog.success) {
      throw new Error('Ошибка при переносе реализации')
    }

    return {
      success: true,
      message: 'Реализация успешно перенесена',
      data: JSON.parse(JSON.stringify(data)),
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
