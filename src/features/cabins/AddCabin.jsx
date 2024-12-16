import React, { useState } from 'react'
import CabinTable from './CabinTable'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'


export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <button className='rounded-lg px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700'>Add new cabin</button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <>
//       <button
//         onClick={() => setIsOpenModal(e => !e)}
//         className="self-start rounded-lg px-8 py-2 -bg--color-brand-600 hover:-bg--color-brand-700 transition-all -text--color-brand-50 text-lg"
//       >{isOpenModal ? 'Hide form' : 'Add new cabin'}</button>
//       {
//         isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinForm onCloseModal={setIsOpenModal} /></Modal>
//       }
//     </>
//   )
// }
