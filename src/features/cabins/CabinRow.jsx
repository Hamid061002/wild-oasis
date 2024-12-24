import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiEllipsisVertical, HiMiniPencil, HiMiniTrash, HiPencil } from "react-icons/hi2"
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
                    className="flex items-center gap-1 text-nowrap -text--color-grey-700 px-2 py-1 rounded-md -bg--color-grey-100 hover:-bg--color-grey-200 transitionOptimized"
                  ><HiPencil /> <span>Edit cabin</span></button>
                </Modal.Open>
              </Menus.Button>

              <Menus.Button>
                <Modal.Open opens='delete-cabin'>
                  <button
                    className="flex items-center gap-1 w-full -bg--color-red-700 px-4 py-1 rounded-md text-white hover:-bg--color-red-800 transitionOptimized"
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
      </div>
    </Table.Row>
  )
}
