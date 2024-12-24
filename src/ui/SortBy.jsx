import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sort-by') || ''

  function handleChange(e) {
    searchParams.set('sort-by', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select options={options} value={sortBy} type='white' onChange={handleChange} />
  )
}
