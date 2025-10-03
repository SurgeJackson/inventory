'use client'
import {
  deleteCategory,
  getAllCategories,
} from '@/lib/actions/category.actions'
import { CategorySheet } from './sheet'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { ICategory } from '@/models/interfaces'
import { DataTable } from '@/components/data-table'
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
// import { copyImages } from '@/lib/actions/item.actions'

export default function CategoriesPage() {
  const currentUser = useSession().data?.user
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState<ICategory | null>(null)

  const { data, mutate } = useSWR('getAllCategories', {
    fetcher: async () => {
      const res = await getAllCategories()
      return res.categories
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    mutate()
  })

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название категории',
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
                  setSelectedRowData(null)
                  setIsSheetOpen(true)
                }}
              >
                Добавить
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRowData(rowData)
                  setIsSheetOpen(true)
                }}
              >
                Редактировать
              </DropdownMenuItem>
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
      {/* <Button
        onClick={() => {
          copyImages()
        }}
      >
        Copy Images
      </Button> */}
      <DataTable columns={columns} data={data} />
      {isSheetOpen && (
        <CategorySheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          selectedRowData={selectedRowData}
        />
      )}
      {isDeleteDialogOpen && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить категорию</AlertDialogTitle>
              <AlertDialogDescription>
                Вы уверены, что хотите удалить эту категорию?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (selectedRowData && selectedRowData._id) {
                    deleteCategory(selectedRowData._id.toString()).then((res) =>
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
