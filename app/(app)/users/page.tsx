'use client'
import { DataTable } from '../../../components/data-table'
import { UserSheet } from './sheet'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Check, MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { deleteUser, getAllUsers } from '@/lib/actions/user.action'
import { IUser } from '@/models/interfaces'
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

export default function UsersPage() {
  const currentUser = useSession().data?.user
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState<IUser | null>(null)
  const { data, mutate } = useSWR('getAllUsers', {
    fetcher: async () => {
      const res = await getAllUsers()
      return res.users
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    mutate()
  })

  const columns: ColumnDef<IUser>[] = [
    // {
    //   accessorKey: '_id',
    //   header: 'ID',
    // },
    {
      accessorKey: 'name',
      header: 'Имя пользователя',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'isAdmin',
      header: 'Админ',
      cell: ({ row }) => {
        const rowData = row.original
        return <div>{rowData.isAdmin ? <Check className='w-4 h-4' /> : ''}</div>
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Активен',
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <div>{rowData.isActive ? <Check className='w-4 h-4' /> : ''}</div>
        )
      },
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
      <DataTable columns={columns} data={data} />
      {isSheetOpen && (
        <UserSheet
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
              <AlertDialogTitle>Удалить пользователя</AlertDialogTitle>
              <AlertDialogDescription>
                Вы уверены, что хотите удалить этого пользователя?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (selectedRowData && selectedRowData._id) {
                    deleteUser(selectedRowData._id.toString()).then((res) =>
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
    <div>Нет доступа</div>
  )
}
