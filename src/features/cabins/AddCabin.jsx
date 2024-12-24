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