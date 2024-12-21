import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const { errors } = formState

  const { createCabinFn, isCreating } = useCreateCabin()
  const { editCabinFn, isEditing } = useEditCabin()
  const isWorking = isCreating || isEditing

  function onSubmitFn(data) {
    const image = typeof (data.image) === 'string' ? data?.image : data.image[0]

    if (isEditSession) editCabinFn({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: () => {
        reset()
        onCloseModal(false)
      }
    })
    else createCabinFn({ ...data, image: image }, {
      onSuccess: () => {
        reset()
        onCloseModal(false)
      }
    })
  }

  function onError() { }

  return (
    <Form onSubmit={handleSubmit(onSubmitFn, onError)}>
      <FormRow label='Cabin name' error={errors?.name}>
        <input
          {...register('name', {
            required: 'This field is required!',
          })}
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 ${errors.name ? 'border-red-600' : '-border--color-grey-200'}`}
          type="text"
          id='name'
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity}>
        <input
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: {
              value: 0,
              message: 'Maximum capacity should be at least 1'
            }
          })}
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 ${errors.maxCapacity ? 'border-red-600' : '-border--color-grey-200'}`}
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice}>
        <input
          {...register('regularPrice', {
            required: 'This field is required!',
            min: {
              value: 10,
              message: 'Regular price should be at least 10'
            }
          })}
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 ${errors.regularPrice ? 'border-red-600' : '-border--color-grey-200'}`}
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount}>
        <input
          {...register('discount', {
            required: 'This field is required!',
            validate: value => Number(value) <= Number(getValues().regularPrice) || 'Discount should be less than regular price!'
          })}
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 ${errors.discount ? 'border-red-600' : '-border--color-grey-200'}`}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors.description}>
        <textarea
          {...register('description')}
          className={`bg-transparent text-lg border-2 rounded-lg py-2 px-4 w-full resize-none ${errors.description ? '-border--color-red-700' : '-border--color-grey-200 '}`}
          id="description"
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image}>
        <div className={`py-2 px-4 border-2 -border--color-grey-200 rounded-lg ${errors?.image ? 'border-red-600' : '-border--color-grey-200'}`}>
          <FileInput
            {...register('image', {
              required: isEditSession ? false : 'This field is required!'
            })}
            type="file"
            className={`w-full ${errors?.image && 'text-red-600'}`}
            id="image"
            accept="image/*"
          />
        </div>
      </FormRow>

      <div className="flex justify-end gap-4 py-4">
        <button
          onClick={() => onCloseModal(false)}
          className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50"
          variation="secondary"
          type="reset"
          disabled={isWorking}
        >Cancel</button>
        <button
          disabled={isWorking}
          className={`rounded-lg px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700 ${isWorking ? 'opacity-50' : ''}`}
        >{isWorking ? isEditSession ? 'Editing...' : 'Creating...' : isEditSession ? 'Edit cabin' : 'Add cabin'}</button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
