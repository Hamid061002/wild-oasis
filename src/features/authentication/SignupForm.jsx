import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, getValues, handleSubmit, formState, reset } = useForm()
  const { errors } = formState

  const { signupFn, isSigningUp } = useSignup()

  function handleSubmitFn(data) {
    const { fullName, email, password } = data
    signupFn({ fullName, email, password }, {
      onSettled: reset
    })
  }

  return (
    <Form onSubmit={handleSubmit(handleSubmitFn)}>
      <FormRowSignUp label="Full name" error={errors?.fullName}>
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:-bg--color-grey-200 ${errors?.fullName ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="text"
          {...register('fullName', {
            required: 'This field is required!'
          })}
          disabled={isSigningUp}
          id="fullName"
        />
      </FormRowSignUp>

      <FormRowSignUp label="Email address" error={errors?.email}>
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:-bg--color-grey-200 ${errors?.email ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="email"
          {...register('email', {
            required: 'This field is required!',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email address is invalid!'
            }
          })}
          disabled={isSigningUp}
          id="email"
        />
      </FormRowSignUp>

      <FormRowSignUp label="Password (min 8 characters)" error={errors?.password}>
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:-bg--color-grey-200 ${errors?.password ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="password"
          {...register('password', {
            required: 'This field is required!',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters!'
            }
          })}
          disabled={isSigningUp}
          id="password"
        />
      </FormRowSignUp>

      <FormRowSignUp label="Repeat password" error={errors?.passwordConfirm}>
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:-bg--color-grey-200 ${errors?.passwordConfirm ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          type="password"
          {...register('passwordConfirm', {
            required: 'This field is required!',
            validate: (value) => value === getValues().password || 'Confirm password is incorrect!'
          })}
          disabled={isSigningUp}
          id="passwordConfirm"
        />
      </FormRowSignUp>

      <div className="flex gap-2 justify-end mt-5">
        {/* type is an HTML attribute! */}
        <button
          disabled={isSigningUp}
          onClick={() => reset()}
          className="rounded-lg px-5 py-3 -text--color-grey-600 border-2 -border--color-grey-200 hover:-bg--color-grey-50 disabled:opacity-70"
        >
          Cancel
        </button>
        <button
          disabled={isSigningUp}
          className='flex justify-center items-center rounded-lg h-14 px-5 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700 disabled:opacity-70'
        >
          {
            isSigningUp ? <SpinnerMini /> : 'Create new user'
          }
        </button>
      </div>
    </Form>
  );
}

export default SignupForm;

function FormRowSignUp({ label, error, children }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_250px] items-center gap-2 py-4">
      <label htmlFor={children.props?.id}>{label}</label>
      {children}
      {error && <p className="self-start flex-none w-full px-3 py-1 rounded-md text-sm -text--color-red-700 -bg--color-red-100 border">{error.message}</p>}
    </div>
  )
}
