import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  const { updateUserFn, isUpdating } = useUpdateUser()

  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (fullName) updateUserFn({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null)
        e.target.reset()
      }
    })
  }

  function hadnleCancel(e) {
    e.preventDefault()
    setAvatar(null)
    setFullName(currentFullName)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:opacity-50 disabled:-bg--color-grey-200 ${false ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}
          value={email} disabled
        />
      </FormRow>
      <FormRow label="Full name">
        <input
          className={`bg-transparent w-full border-2 rounded-lg py-2 px-4 outline-none disabled:opacity-50 disabled:-bg--color-grey-200 ${false ? 'border-red-600 text-red-600' : '-border--color-grey-200'}`}

          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          className={`w-full disabled:opacity-50 ${false && 'text-red-600'}`}
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
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
        >{isUpdating ? <SpinnerMini /> : 'Update account'}</button>
      </div>
    </Form>
  );
}

export default UpdateUserDataForm;
