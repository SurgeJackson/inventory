'use client'
import { SWRConfig } from 'swr'

export default function SWRConsumer({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData: object
}) {
  return (
    <SWRConfig
      value={{
        fallback: initialData,
        dedupingInterval: 5000,
        refreshInterval: 30000,
      }}
    >
      {children}
    </SWRConfig>
  )
}
