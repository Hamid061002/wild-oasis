import styled from "styled-components";

// import Input from "../../ui/Input";
import Form from "../../ui/Form";
// import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabin";
import { useState } from "react";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm()
  
  function onSubmitFn(data) {
    mutate(data)
  }

  const queryClient = useQueryClient()
  
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created')
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


  return (
    <Form onSubmit={handleSubmit(onSubmitFn)}>
      <FormRow>
        <label htmlFor="name">Cabin name</label>
        <input
          {...register('name')}
          className="border-2 -border--color-grey-200 rounded-lg py-2 px-4"
          type="text"
          id="name"
        />
      </FormRow>

      <FormRow>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input
          {...register('maxCapacity')}
          className="border-2 -border--color-grey-200 rounded-lg py-2 px-4"
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      <FormRow>
        <label htmlFor="regularPrice">Regular price</label>
        <input
          {...register('regularPrice')}
          className="border-2 -border--color-grey-200 rounded-lg py-2 px-4"
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow>
        <label htmlFor="discount">Discount</label>
        <input
          {...register('discount')}
          className="border-2 -border--color-grey-200 rounded-lg py-2 px-4"
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow>
        <label htmlFor="description">Description for website</label>
        <textarea
          {...register('description')}
          className="border-2 -border--color-grey-200 rounded-lg py-2 px-4 w-full resize-none"
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow>
        <label htmlFor="image">Cabin photo</label>
        <FileInput {...register('image')} className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <button className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50" variation="secondary" type="reset">
          Cancel
        </button>
        <button
          className="rounded-lg px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700"
        >Edit cabin</button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
