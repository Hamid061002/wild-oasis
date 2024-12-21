import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUpdateUser from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUserFn, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {

    updateUserFn({ password }, {
      onSettled: reset
    });
  }

  function hadnleCancel(e) {
    e.preventDefault()
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowUpdatePassword
        label="New password (min 8 characters)"
        error={errors?.password}
      >
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:opacity-50 disabled:-bg--color-grey-200 ${errors?.password ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowUpdatePassword>

      <FormRowUpdatePassword
        label="Confirm password"
        error={errors?.passwordConfirm}
      >
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:opacity-50 disabled:-bg--color-grey-200 ${errors?.passwordConfirm ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRowUpdatePassword>
      <div className="flex gap-2 justify-end mt-5">
        <button
          className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50 disabled:opacity-70 disabled:opacity-50"
          onClick={hadnleCancel}
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          disabled={isUpdating}
          className='flex justify-center items-center rounded-lg h-14 px-5 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700 disabled:opacity-70'
        >{isUpdating ? <SpinnerMini /> : 'Update password'}</button>
      </div>
    </Form>
  );
}

function FormRowUpdatePassword({ label, error, children }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_250px] items-center gap-2 py-4">
      <label htmlFor={children.props?.id}>{label}</label>
      {children}
      {error && <p className="self-start flex-none w-full px-3 py-1 rounded-md text-sm -text--color-red-700 -bg--color-red-100 border">{error.message}</p>}
    </div>
  )
}


export default UpdatePasswordForm;
