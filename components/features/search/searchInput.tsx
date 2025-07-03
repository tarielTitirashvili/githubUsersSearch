import React from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Search } from 'lucide-react'

type Props = {
  placeholder?: string
  type?: string
  value: string
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchClick: () => void
  onFocus: () => void
  inputRef?: React.Ref<HTMLInputElement>
}

const SearchInput = (props: Props) => {
  const {
    placeholder = 'Search',
    type = 'text',
    changeHandler,
    value,
    searchClick,
    onFocus,
    inputRef
  } = props
  return (
    <div className="border rounded-lg flex justify-between items-center w-full focus-within:background-accent focus-within:ring-1 focus-within:ring-offset-0 focus-within:ring-ring">
      <Input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className="border-none rounded-tr-sm rounded-br-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
        value={value}
        onChange={changeHandler}
        onFocus={onFocus}
      />
      <Button type='button' size={'icon'} variant={'ghost'} onClick={searchClick}>
        <Search />
        <span className="sr-only">Search button</span>
      </Button>
    </div>
  )
}

export default SearchInput
