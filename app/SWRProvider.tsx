import { getAllCategories } from '@/lib/actions/category.actions'
import SWRConsumer from './SWRConsumer'
import { getAllWarehouses } from '@/lib/actions/warehouse.action'
import { getAllUsers } from '@/lib/actions/user.action'
import { getAllItemsWithImages } from '@/lib/actions/item.actions'
import { auth } from './api/auth/[...nextauth]/auth'

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
    [`getAllItemsWithImages(${session?.user.warehouse._id})`]:
      await getAllItemsWithImages(session?.user.warehouse),
    // [`compareItems(${session?.user.warehouse._id})`]: (
    //   await compareItems(session?.user.warehouse)
    // ).items,
  }

  return <SWRConsumer initialData={initialData}>{children}</SWRConsumer>
}
