'use server'
import { getBuhOrganization } from './organization.action'
import { createSaleLog } from './saleLog.action'

const usernameBUH = process.env.USERNAME_1CBUH!
const passwordBUH_raw = process.env.PASSWORD_1CBUH!
const credentialsBUH = Buffer.from(
  `${usernameBUH}:${passwordBUH_raw}`
).toString('base64')

const usernameTorg = process.env.USERNAME_1C!
const passwordTorg_raw = process.env.PASSWORD_1C!
const credentialsTorg = Buffer.from(
  `${usernameTorg}:${passwordTorg_raw}`
).toString('base64')

export async function get1cItems(warehouseId: string) {
  const url =
    process.env.URL_1C +
    "AccumulationRegister_СвободныеОстатки/Balance(Dimensions='Номенклатура, Склад')?&$format=json&$expand=Склад,Номенклатура&$select=Склад/Ref_Key,Склад/Description,ВНаличииBalance,Номенклатура/Артикул,Номенклатура/Description,Номенклатура/Ref_Key&$filter=Склад_Key eq guid'" +
    warehouseId +
    "'&$orderby=ВНаличииBalance desc"

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsTorg}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export async function get1CSales(startDate: string, endDate: string) {
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
      Authorization: `Basic ${credentialsTorg}`,
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
  const filter = inn ? `ИНН eq '${inn}'` : `НаименованиеПолное eq '${name}'`
  const url =
    'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_Контрагенты?$format=json&$select=Ref_Key,Description,ИНН,НаименованиеПолное&$filter=' +
    filter
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsBUH}`,
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
          Authorization: `Basic ${credentialsBUH}`,
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

export async function getBuhClientContract(owner_ref_key: string) {
  const filter = `Owner_Key eq guid'${owner_ref_key}'`
  const url =
    'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_ДоговорыКонтрагентов?$format=json&$filter=' +
    filter
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsBUH}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data?.value[0]
}

export async function getTorgItem(guid: string) {
  const url =
    process.env.URL_1C + "Catalog_Номенклатура(guid'" + guid + "')?$format=json"

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsTorg}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export async function getBuhItem(sku: string) {
  const filter = `Code eq '${sku}'`
  const url =
    'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Catalog_Номенклатура?$format=json&&$filter=' +
    filter

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsBUH}`,
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
    const org = await getBuhOrganization(sale.Организация.Ref_Key)
    const client = await getBuhClient(
      sale.Контрагент.Description,
      sale.Контрагент.ИНН
    )

    const items = await getItemCodes(sale)

    const contract = await getBuhClientContract(client.Ref_Key)

    const raw = JSON.stringify({
      Number: sale.Number,
      Date: sale.Date,
      Склад_Key: '1812c4dd-56a3-11e3-99b0-0025900d739a',
      Организация_Key: org.organization.buhKey,
      Контрагент_Key: client.Ref_Key,
      ДоговорКонтрагента_Key: contract.Ref_Key,
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
        СчетУчета_Key: 'bdae4db4-8ec0-11e9-b907-525400fb5157',
        СчетДоходов_Key: 'bdae4e9e-8ec0-11e9-b907-525400fb5157',
        СчетУчетаНДСПоРеализации_Key: 'bdae4ea3-8ec0-11e9-b907-525400fb5157',
        СчетРасходов_Key: 'bdae4ea1-8ec0-11e9-b907-525400fb5157',
      })),
    })

    const res = await fetch(
      'http://office.gnezdoproject.ru/1cbuh/odata/standard.odata/Document_РеализацияТоваровУслуг?$format=json',
      {
        method: 'POST',
        body: raw,
        headers: {
          Authorization: `Basic ${credentialsBUH}`,
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

export async function getTorgMaxItemCode() {
  const url =
    process.env.URL_1C +
    'Catalog_Номенклатура?$format=json&$filter=IsFolder eq false&$top=1&$orderby=Code desc&$select=Code'

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsTorg}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data.value[0].Code
}

export async function syncGoods() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createDestItem(srcItem: any) {
    const url =
      process.env.URL_1CBUH! +
      "Catalog_Номенклатура?$expand=*&$format=json&$filter=Code eq '" +
      srcItem.Parent?.Code +
      "'"

    const resItem = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentialsBUH}`,
        'Content-Type': 'application/json',
      },
    })
    const destItem = await resItem.json()

    const destParentFolder = srcItem.Parent ? destItem : srcItem.Parent_Key

    //console.log("CREATE: --->");
    const data = JSON.stringify({
      DeletionMark: srcItem?.DeletionMark,
      IsFolder: srcItem?.IsFolder,
      Code: srcItem?.Code,
      Description: srcItem?.Description,
      Артикул: srcItem?.Артикул,
      НаименованиеПолное: srcItem?.НаименованиеПолное,
      Parent_Key: srcItem.Parent
        ? destParentFolder.value[0]?.Ref_Key
        : srcItem.Parent_Key,
    })
    //console.log(data);
    //console.log("CREATE: <---");

    const srv_url = process.env.URL_1CBUH! + 'Catalog_Номенклатура'

    const response = await await fetch(srv_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentialsBUH}`,
      },
      body: data,
    })

    if (response.ok) {
      const item = await response.json()
      //console.log(item);
      console.log(
        'CREATED ITEM! ' +
          item.Code +
          ' ' +
          item.Ref_Key +
          ' ' +
          item.Description
      )
      return item.Ref_Key
    } else {
      console.log(await response.json())
      return false
    }
  }

  async function checkItem(srcItem: { Code: string }) {
    const url =
      process.env.URL_1CBUH! +
      "Catalog_Номенклатура?$expand=*&$format=json&$filter=Code eq '" +
      srcItem.Code +
      "'"
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentialsBUH}`,
        'Content-Type': 'application/json',
      },
    })
    const destItem = await response.json()

    if (destItem.value[0]) {
      console.log(destItem.value[0].Code)
    } else {
      await createDestItem(srcItem)
    }
  }

  const url =
    process.env.URL_1C! +
    'Catalog_Номенклатура/$count?$filter=IsFolder eq false'

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentialsTorg}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const count = await res.json()
  console.log(count)

  let n = 0 //248900;
  console.log(n)

  while (n < count) {
    const url =
      process.env.URL_1C! +
      'Catalog_Номенклатура?$format=json&$expand=Parent&$orderby=Code desc&$filter=IsFolder eq false&$top=200&$skip=' +
      n
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentialsTorg}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const items = await res.json()

    let k = 0
    while (k < 200) {
      await checkItem(items.value[k])
      k++
    }

    n = n + 200
    console.log('Processed: ' + n)
  }
}
