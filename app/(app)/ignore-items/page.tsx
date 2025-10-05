'use client'
import { DataTable } from '../../../components/data-table'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { IWarehouse } from '@/models/interfaces'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { deleteIgnoreItem, getAllIgnoreItems } from '@/lib/actions/item.actions'

export default function WarehousesPage() {
  const currentUser = useSession().data?.user

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState<IWarehouse | null>(
    null
  )
  const warehouse = useSession().data?.user?.warehouse

  const { data, mutate } = useSWR(`getAllIgnoreItems(${warehouse._id})`, {
    fetcher: async () => {
      const res = await getAllIgnoreItems(warehouse)
      return res.items
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    mutate()
  })

  const columns: ColumnDef<IWarehouse>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
    },
    {
      accessorKey: 'sku',
      header: 'Артикул товара',
    },
    {
      accessorKey: 'warehouse.name',
      header: 'Склад',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Действия</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRowData(rowData)
                  setIsDeleteDialogOpen(true)
                }}
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return currentUser?.isAdmin ? (
    <div className='px-10'>
      <DataTable columns={columns} data={data} />
      {isDeleteDialogOpen && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить товар</AlertDialogTitle>
              <AlertDialogDescription>
                Вы уверены, что хотите удалить этот товар?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (selectedRowData && selectedRowData._id) {
                    deleteIgnoreItem(selectedRowData._id.toString()).then(
                      (res) =>
                        res.success
                          ? toast.success(res.message)
                          : toast.error(res.message)
                    )
                  }
                  setIsDeleteDialogOpen(false)
                }}
              >
                Продолжить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  ) : (
    <div>Access Denied</div>
  )
}
