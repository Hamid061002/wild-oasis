import React from 'react'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOperations() {
  return (
    <div className='flex items-center gap-6'>
      <Filter filterField='discount' options={[
        { label: 'All', value: 'all' },
        { label: 'No discount', value: 'no-discount' },
        { label: 'With discount', value: 'with-discount' },
      ]} />
      <SortBy options={[
        {value: 'name-asc', label: 'Sort by name (A-Z)'},
        {value: 'name-desc', label: 'Sort by name (Z-A)'},
        {value: 'regularPrice-asc', label: 'Sort by price (low first)'},
        {value: 'regularPrice-desc', label: 'Sort by price (high first)'},
        {value: 'maxCapacity-asc', label: 'Sort by capacity (low first)'},
        {value: 'maxCapacity-desc', label: 'Sort by capacity (high first)'},
        {value: 'discount-asc', label: 'Sort by discount (low first)'},
        {value: 'discount-desc', label: 'Sort by discount (high first)'},
      ]} />
    </div>
  )
}
