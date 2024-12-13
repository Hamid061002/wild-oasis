import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabin";
import { toast } from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false)

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin

  const { deleteCabinFn, isDeleting} = useDeleteCabin()

  return (
    <>
      <div className={`grid grid-cols-6 gap-y-9 items-center justify-items-center py-6 px-10 border-b -border--color-grey-200 ${isDeleting == true ? 'opacity-50' : ''}`}>
        <img className="block w-[6.4rem] aspect-video object-cover object-center scale-150 -translate-x-2" src={image} />
        <div className="text-2xl -text--color-grey-600 sono-600">{name}</div>
        <div className="text-center">Fix up to {maxCapacity} guests</div>
        <div className="sono-600">{formatCurrency(regularPrice)}</div>
        {discount ? <div className="sono-600 -text--color-green-700">{formatCurrency(discount)}</div> : <span>_</span>}
        <div className="flex flex-col gap-1 text-base">
          <button
            disabled={isDeleting}
            onClick={() => deleteCabinFn(cabinId)}
            className="-bg--color-red-700 px-3 py-1 rounded-lg text-white hover:-bg--color-red-800 transitionOptimazed"
          >{isDeleting == true ? 'Deleting..' : 'Delete'}</button>
          <button
            onClick={() => setShowEditForm(e => !e)}
            className="-text--color-grey-700 px-3 py-1 rounded-lg -bg--color-grey-100 hover:-bg--color-grey-200 transitionOptimazed"
          >Edit cabin</button>
        </div>
      </div>
      {
        showEditForm && <CreateCabinForm setShowForm={setShowEditForm} cabinToEdit={cabin} />
      }
    </>
  )
}
