import { getAllCategories } from '@/lib/actions/category.actions'
import SWRConsumer from './SWRConsumer'
import { getAllWarehouses } from '@/lib/actions/warehouse.action'
import { getAllUsers } from '@/lib/actions/user.action'
import {
  getAllIgnoreItems,
  getAllItemsWithImages,
} from '@/lib/actions/item.actions'
import { auth } from './api/auth/[...nextauth]/auth'
import { getAllZones } from '@/lib/actions/zone.action'

export default async function SWRProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  const initialData = {
    ['getAllCategories']: (await getAllCategories()).categories,
    ['getAllWarehouses']: (await getAllWarehouses()).warehouses,
    ['getAllUsers']: (await getAllUsers()).users,
    [`getAllZones(${session?.user.warehouse._id})`]: (
      await getAllZones(session?.user.warehouse)
    ).zones,
    [`getAllItemsWithImages(${session?.user.warehouse._id})`]:
      await getAllItemsWithImages(session?.user.warehouse),
    [`getAllIgnoreItems(${session?.user.warehouse._id})`]: (
      await getAllIgnoreItems(session?.user.warehouse)
    ).items,
    // [`compareItems(${session?.user.warehouse._id})`]: (
    //   await compareItems(session?.user.warehouse)
    // ).items,
  }

  return <SWRConsumer initialData={initialData}>{children}</SWRConsumer>
}
