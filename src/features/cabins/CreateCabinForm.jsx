import styled from "styled-components";

// import Input from "../../ui/Input";
import Form from "../../ui/Form";
// import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm()

  function onSubmitFn(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitFn)}>
      <FormRow>
        <label htmlFor="name">Cabin name</label>
        <input className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" {...register('name')} type="text" id="name" />
      </FormRow>

      <FormRow>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" {...register('maxCapacity')} type="number" id="maxCapacity" />
      </FormRow>

      <FormRow>
        <label htmlFor="regularPrice">Regular price</label>
        <input className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" {...register('regularPrice')} type="number" id="regularPrice" />
      </FormRow>

      <FormRow>
        <label htmlFor="discount">Discount</label>
        <input className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" {...register('discount')} type="number" id="discount" defaultValue={0} />
      </FormRow>

      <FormRow>
        <label htmlFor="description">Description for website</label>
        <textarea {...register('description')} className="border-2 -border--color-grey-200 rounded-lg py-2 px-4 w-full resize-none" id="description" defaultValue="" />
      </FormRow>

      <FormRow>
        <label htmlFor="image">Cabin photo</label>
        <FileInput className="border-2 -border--color-grey-200 rounded-lg py-2 px-4" id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <button className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50" variation="secondary" type="reset">
          Cancel
        </button>
        <button className="rounded-lg px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700">Edit cabin</button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
