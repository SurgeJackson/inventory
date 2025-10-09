import SWRConsumer from './SWRConsumer'

import { auth } from './api/auth/[...nextauth]/auth'
import { getAllCategories } from '@/lib/actions/category.actions'
import { getAllWarehouses } from '@/lib/actions/warehouse.action'
import { getAllUsers } from '@/lib/actions/user.action'
import { getAllZones } from '@/lib/actions/zone.action'
import {
  compareItems,
  getAllIgnoreItems,
  getAllItems,
  getItemsCodeQty,
} from '@/lib/actions/item.actions'

export default async function SWRProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const warehouse = session?.user?.warehouse
  const warehouseId = warehouse?._id?.toString()

  // Fetch globals in parallel
  const [catsRes, whsRes, usersRes] = await Promise.all([
    getAllCategories(),
    getAllWarehouses(),
    getAllUsers(),
  ])

  // Fetch warehouse-scoped data in parallel (or provide fallbacks)
  const [
    zonesRes,
    itemsWithImagesRes,
    ignoreItemsRes,
    itemsCodeQtyRes,
    compareItemsQtyRes,
  ] = warehouse
    ? await Promise.all([
        getAllZones(warehouse),
        getAllItems(warehouse),
        getAllIgnoreItems(warehouse),
        getItemsCodeQty(warehouse),
        compareItems(warehouse),
      ])
    : [
        { zones: [] },
        { items: [] },
        { items: [] },
        { items: [] },
        { items: [] },
      ]

  const initialData = {
    // global
    getAllCategories: catsRes.categories,
    getAllWarehouses: whsRes.warehouses,
    getAllUsers: usersRes.users,

    // warehouse-scoped (keep exact keys you used on the client)
    ...(warehouseId && {
      [`getAllZones(${warehouseId})`]: zonesRes.zones,
      [`getAllItems(${warehouseId})`]: itemsWithImagesRes,
      [`getAllIgnoreItems(${warehouseId})`]: ignoreItemsRes.items,
      [`getItemsCodeQty(${warehouseId})`]: itemsCodeQtyRes.items,
      [`compareItemsQty(${warehouseId})`]: compareItemsQtyRes.items.length,
    }),
  }

  return <SWRConsumer initialData={initialData}>{children}</SWRConsumer>
}
