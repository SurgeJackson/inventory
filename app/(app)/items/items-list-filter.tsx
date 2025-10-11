import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Search, X } from 'lucide-react'

export default function ItemsListFilter({
  filter,
  filterCode,
  noCodeFilter,
  setFilter,
  setFilterCode,
  setNoCodeFilter,
  handleFilterEnter,
}: {
  filter: string
  filterCode: string
  noCodeFilter: boolean
  setFilter: (filter: string) => void
  setFilterCode: (filter: string) => void
  setNoCodeFilter: (filter: boolean) => void
  handleFilterEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
  return (
    <div className='flex gap-2'>
      <div className='flex items-center gap-1 w-full'>
        <Search className='w-5 h-5' strokeWidth={1} />
        <Input
          id='search'
          value={filter}
          onKeyDown={handleFilterEnter}
          onChange={(e) => {
            setFilterCode('')
            setFilter(e.target.value)
          }}
          placeholder='Поиск по артикулу/названию/QR'
        />
        {(filter || filterCode) && (
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setFilter('')
              setFilterCode('')
            }}
          >
            <X className='w-5 h-5' strokeWidth={1} />
          </Button>
        )}
      </div>

      <div className='flex items-center gap-1'>
        <Switch
          id='no-qr'
          checked={noCodeFilter}
          onCheckedChange={setNoCodeFilter}
        />
        <Label className='text-nowrap text-xs' htmlFor='no-qr'>
          Без QR
        </Label>
      </div>
    </div>
  )
}
