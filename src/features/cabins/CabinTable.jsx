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
  // switch (sortByValue) {
  //   case 'name-asc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => prev.name - next.name)
  //     break;
  //   case 'name-desc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => next.name - prev.name)
  //     break;
  //   case 'regular-price-asc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => prev.regularPrice - next.regularPrice)
  //     break;
  //   case 'regular-price-desc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => next.regularPrice - prev.regularPrice)
  //     break;
  //   case 'max-capacity-asc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => prev.maxCapacity - next.maxCapacity)
  //     break;
  //   case 'max-capacity-desc':
  //     sortCabinsBy = filteredCabins?.sort((prev, next) => next.maxCapacity - prev.maxCapacity)
  //     break;

  //   default:
  //     break;
  // }

  if (isGettingCabins) return <Spinner />

  return (
    <Menus>
      <Table columns='6'>
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

