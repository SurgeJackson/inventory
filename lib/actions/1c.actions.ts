'use server'

export async function get1cItems(warehouseId: string) {
  const username = process.env.USERNAME_1C!
  const password_raw = process.env.PASSWORD_1C!

  const credentials = Buffer.from(`${username}:${password_raw}`).toString(
    'base64'
  )

  const url =
    process.env.URL_1C + warehouseId + "'&$orderby=ВНаличииBalance desc"

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
