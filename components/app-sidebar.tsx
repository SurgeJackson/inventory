'use client'
import {
  AlignHorizontalJustifyStart,
  Ban,
  Boxes,
  ChartBarStacked,
  ChevronDown,
  ChevronUp,
  LandPlot,
  MoveHorizontal,
  Store,
  User,
  User2,
  Warehouse,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { IWarehouse } from '@/models/interfaces'
import { signOut, useSession } from 'next-auth/react'
import { getAllWarehouses } from '@/lib/actions/warehouse.action'
import useSWR from 'swr'
import { compareItems, getItemsCodeQty } from '@/lib/actions/item.actions'

// Menu items.
const items = [
  // {
  //   title: 'Home',
  //   url: '/',
  //   icon: Home,
  //   isAdmin: false,
  // },
  {
    title: 'Остатки товаров',
    url: 'items',
    icon: Boxes,
    isAdmin: false,
  },
  {
    title: 'Движения товаров',
    url: 'settings',
    icon: MoveHorizontal,
    isAdmin: false,
  },
  {
    title: 'Категории',
    url: 'categories',
    icon: ChartBarStacked,
    isAdmin: true,
  },
  {
    title: 'Склады',
    url: 'warehouses',
    icon: Store,
    isAdmin: true,
  },
  {
    title: 'Зоны хранения',
    url: 'zones',
    icon: LandPlot,
    isAdmin: true,
  },
  {
    title: 'Пользователи',
    url: 'users',
    icon: User,
    isAdmin: true,
  },
  {
    title: 'Неучитываемые товары',
    url: 'ignore-items',
    icon: Ban,
    isAdmin: true,
  },
  {
    title: 'Реализации в бухгалтерию',
    url: 'sales',
    icon: AlignHorizontalJustifyStart,
    isAdmin: true,
  },
]

export function AppSidebar() {
  const session = useSession()
  const user = session?.data?.user
  const warehouse = user?.warehouse as IWarehouse
  const warehouseId = warehouse?._id?.toString()

  async function setWarehouse(warehouse: IWarehouse) {
    await session.update({
      user: {
        warehouse: warehouse,
      },
    })
  }
  const { data: warehouses } = useSWR('getAllWarehouses', {
    fetcher: async () => {
      const res = await getAllWarehouses()
      return res.warehouses
    },
  })

  const { data: itemsQty } = useSWR(`getItemsCodeQty(${warehouseId})`, {
    fetcher: async () => {
      const res = await getItemsCodeQty(warehouse)
      return res.items
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  const { data: diffQty } = useSWR(`compareItemsQty(${warehouseId})`, {
    fetcher: async () => {
      const res = await compareItems(warehouse)
      return res.items.length
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Warehouse />
                  {warehouse?.name || 'Select Warehouse'}
                  <ChevronDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {user?.isAdmin && (
                <DropdownMenuContent>
                  {warehouses?.map((warehouse: IWarehouse) => (
                    <DropdownMenuItem
                      key={warehouse._id.toString()}
                      onClick={() => setWarehouse(warehouse)}
                    >
                      <span>{warehouse.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Управление остатками</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.isAdmin && !user?.isAdmin ? null : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.url === 'items' && itemsQty && (
                          <span className='ml-auto text-xs'>
                            ({itemsQty[0]?.nonEmpty}/{itemsQty[0]?.total})
                          </span>
                        )}
                        {item.url === 'settings' && diffQty && (
                          <span className='ml-auto text-xs'>({diffQty})</span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {user?.email}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top'>
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut()
                  }}
                >
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
