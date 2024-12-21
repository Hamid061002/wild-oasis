import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return <div className="flex flex-col gap-10 -text--color-grey-700">
    <h1 className="text-4xl">Create a new user</h1>
    <SignupForm />
  </div>
}

export default NewUsers;
