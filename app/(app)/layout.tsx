import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import SWRProvider from '../SWRProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SWRProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-full'>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </SWRProvider>
  )
}
