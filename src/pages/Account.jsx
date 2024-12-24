import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="flex flex-col gap-10 -text--color-grey-700">
      <h1 className="text-4xl">Update your account</h1>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">Update user data</h3>
        <UpdateUserDataForm />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default Account;
