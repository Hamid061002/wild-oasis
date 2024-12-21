import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiEllipsisVertical, HiMiniPencil, HiMiniTrash, HiPencil } from "react-icons/hi2"
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

export default function CabinRow({ cabin }) {
  const { deleteCabinFn, isDeleting } = useDeleteCabin()

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin


  return (
    <Table.Row>
      <img className="block border -border--color-grey-300 w-[6.4rem] aspect-video object-cover object-center scale-150 -translate-x-2 rounded" src={image} />
      <div className="text-2xl -text--color-grey-600 sono-600">{name}</div>
      <div className="text-center">Fix up to {maxCapacity} guests</div>
      <div className="sono-700 underline underline-offset-4">{formatCurrency(regularPrice)}</div>
      {discount ? <div className="sono-600 underline underline-offset-4 -text--color-green-700">{formatCurrency(discount)}</div> : <span>_</span>}
      <div className="flex flex-col gap-1 text-base relative">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} ><HiEllipsisVertical className="size-9 -text--color-grey-700" /></Menus.Toggle>

            <Menus.List id={cabinId}>
              <Menus.Button>
                <Modal.Open opens='edit-cabin'>
                  <button
                    className="flex items-center gap-1 text-nowrap -text--color-grey-700 px-2 py-1 rounded-md -bg--color-grey-100 hover:-bg--color-grey-200 transitionOptimazed"
                  ><HiPencil /> <span>Edit cabin</span></button>
                </Modal.Open>
              </Menus.Button>

              <Menus.Button>
                <Modal.Open opens='delete-cabin'>
                  <button
                    className="flex items-center gap-1 w-full -bg--color-red-700 px-4 py-1 rounded-md text-white hover:-bg--color-red-800 transitionOptimazed"
                  ><HiMiniTrash />Delete</button>
                </Modal.Open>
              </Menus.Button>
            </Menus.List>

            <Modal.Window name='delete-cabin'>
              <ConfirmDelete disabled={isDeleting} resourceName={`cabin ${name}`} onConfirm={() => deleteCabinFn(cabinId)} />
            </Modal.Window>

            <Modal.Window name='edit-cabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

          </Menus.Menu>
        </Modal>

        {/* <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List>
            <Menus.Button>Delete</Menus.Button>
            <Menus.Button>Edit</Menus.Button>
          </Menus.List>
        </Menus.Menu> */}

      </div>
    </Table.Row>
    // <div className={`grid grid-cols-6 gap-y-9 items-center justify-items-center py-6 px-10 border-b -border--color-grey-200 ${isDeleting == true ? 'opacity-50' : ''}`}>
    //   <img className="block border -border--color-grey-300 w-[6.4rem] aspect-video object-cover object-center scale-150 -translate-x-2 rounded" src={image} />
    //   <div className="text-2xl -text--color-grey-600 sono-600">{name}</div>
    //   <div className="text-center">Fix up to {maxCapacity} guests</div>
    //   <div className="sono-700 underline underline-offset-4">{formatCurrency(regularPrice)}</div>
    //   {discount ? <div className="sono-600 underline underline-offset-4 -text--color-green-700">{formatCurrency(discount)}</div> : <span>_</span>}
    //   <div className="flex flex-col gap-1 text-base">
    //     <Modal>
    //       {/* delete modal */}
    //       <Modal.Open opens='edit-cabin'>
    //         <button
    //           className="flex  items-center gap-1 -bg--color-red-700 px-4 py-1 rounded-lg text-white hover:-bg--color-red-800 transitionOptimazed"
    //         ><HiMiniTrash />Delete</button>
    //       </Modal.Open>
    //       <Modal.Window name='edit-cabin'>
    //         <ConfirmDelete disabled={isDeleting} resourceName={name} onConfirm={() => deleteCabinFn(cabinId)} />
    //       </Modal.Window>

    //       {/* edit modal */}
    //       <Modal.Open opens='delete-cabin'>
    //         <button
    //           className="flex items-center gap-1 -text--color-grey-700 px-2 py-1 rounded-lg -bg--color-grey-100 hover:-bg--color-grey-200 transitionOptimazed"
    //         ><HiPencil /> <span>Edit cabin</span></button>
    //       </Modal.Open>
    //       <Modal.Window name='delete-cabin'>
    //         <CreateCabinForm cabinToEdit={cabin} />
    //       </Modal.Window>
    //     </Modal>
    //   </div>
    // </div>
  )
}
