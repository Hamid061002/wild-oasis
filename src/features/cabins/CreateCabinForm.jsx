

// import Input from "../../ui/Input";
import Form from "../../ui/Form";
// import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabin";
import { useState } from "react";
import FormRow from "../../ui/FormRow";



function CreateCabinForm({ setShowForm, cabinToAdd = {} }) {
  const { id: editId, ...editValues } = cabinToAdd
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  
  const { errors } = formState

  function onSubmitFn(data) {
    const image = typeof (data.image === 'string') ? data.image : data.image[0]

    if (isEditSession) editCabin({ ...data, image }, data.id)
    else createCabin({ ...data, image: data.image[0] })
  }

  function onError() { }

  const queryClient = useQueryClient()

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
      reset()
    },
    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
      reset()
    },
    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })

  const isWorking = isCreating || isEditing

  return (
    <Form onSubmit={handleSubmit(onSubmitFn, onError)}>
      <FormRow label='Cabin name' error={errors?.name}>
        <input
          {...register('name', {
            required: 'This field is required!',
          })}
          className={`border-2 rounded-lg py-2 px-4 ${errors.name ? 'border-red-600' : '-border--color-grey-200'}`}
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
          className={`border-2 rounded-lg py-2 px-4 ${errors.maxCapacity ? 'border-red-600' : '-border--color-grey-200'}`}
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
          className={`border-2 rounded-lg py-2 px-4 ${errors.regularPrice ? 'border-red-600' : '-border--color-grey-200'}`}
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount}>
        <input
          {...register('discount', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'Discount should be at least 1'
            },
            validate: value => Number(value) <= Number(getValues().regularPrice) || 'Discount should be less than regular price!'
          })}
          className={`border-2 rounded-lg py-2 px-4 ${errors.discount ? 'border-red-600' : '-border--color-grey-200'}`}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors.description}>
        <textarea
          {...register('description')}
          className={`border-2 rounded-lg py-2 px-4 w-full resize-none ${errors.description ? '-border--color-red-700' : '-border--color-grey-200 '}`}
          id="description"
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image}>
        <div className="relative flex items-center gap-2 py-2 px-4 border-2 -border--color-grey-200 rounded-lg">
          <FileInput
            {...register('image', {
              required: isEditSession ? false : 'This field is required!'
            })}
            type="file"
            className=""
            id="image"
            accept="image/*"
          />
        </div>
      </FormRow>

      <div className="flex justify-end gap-4 py-4">
        <button
          onClick={() => setShowForm(false)}
          className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50"
          variation="secondary"
          type="reset"
        >Cancel</button>
        <button
          disabled={isWorking}
          className={`rounded-lg px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700 ${isWorking ? 'opacity-50' : ''}`}
        >{isWorking ? 'Creating...' : isEditSession ? 'Edit cabin' : 'Add cabin'}</button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
