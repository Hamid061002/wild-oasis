
import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabin"
import Spinner from "../../ui/Spinner"
import CabinRow from "./CabinRow"

// import styled from "styled-components";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { isLoading, data: cabins, error } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins
  })

  if (isLoading) return <Spinner />

  return (
    <div className="border text-xl -bg--color-grey-0 rounded-lg -border--color-grey-200 overflow-hidden">
      <header className="grid grid-cols-6 gap-y-11 justify-items-center -bg--color-grey-50 border-b -border--color-grey-100 uppercase tracking-[0.4px] font-semibold -text--color-grey-600 py-6 px-10">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header>
      {
        cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id} />)
      }      
    </div>
  )
}

