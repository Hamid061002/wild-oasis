import { useSearchParams } from "react-router-dom"
import Menus from "../../ui/Menus"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import CabinRow from "./CabinRow"
import useCabins from "./useCabins"

export default function CabinTable() {
  const { isGettingCabins, cabins } = useCabins()

  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('discount') || 'all'
  let filteredCabins
  if (filterValue == 'all') filteredCabins = cabins?.sort((prev, next) => (prev.name - next.name))
  if (filterValue == 'no-discount') filteredCabins = cabins?.filter(cabin => cabin.discount == 0)
  if (filterValue == 'with-discount') filteredCabins = cabins?.filter(cabin => cabin.discount > 0)

  const sortByValue = searchParams.get('sort-by') || ''
  const [field, direction] = sortByValue.split('-')
  const sortCabinsBy = filteredCabins?.sort((prev, next) => direction == 'asc' ? prev[field] - next[field] : next[field] - prev[field]) 

  if (isGettingCabins) return <Spinner />

  return (
    <Menus>
      <Table columns='repeat(6,1fr)'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortCabinsBy} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  )
}

