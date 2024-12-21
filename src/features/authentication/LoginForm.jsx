import { useState } from "react";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("toxeko8276@owube.com");
  const [password, setPassword] = useState("12345678");

  const { loginFn, isLoggingIn } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) loginFn({ email, password }, {
      onSettled: () => {
        setEmail('')
        setPassword('')
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          className="disabled:-bg--color-grey-100"
          disabled={isLoggingIn}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          className="disabled:-bg--color-grey-100"
          disabled={isLoggingIn}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>

        <button className='flex justify-center items-center rounded-lg h-14 px-5 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700'>
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
