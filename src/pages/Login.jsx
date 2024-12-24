import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return <main className="flex items-center justify-center w-full min-h-screen -bg--color-grey-50 -text--color-grey-700">
    <div className="flex flex-col gap-10 w-[640px]">
      <Logo className='h-28' />
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl text-center">Log in to your account</h1>
        <LoginForm />
      </div>
    </div>
  </main>;
}

export default Login;
