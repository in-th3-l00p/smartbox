import React, {useState} from "react";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Button} from "react-bootstrap";
import {authenticate} from "../api/authenticate";

const Login = () => {
  const [error, setError] = useState<Error>();

  return (
    <Layout>
      <AuthForm
        type={"login"}
        error={error}
        onSubmit={(data) => {
          const selectedData = data as typeof data & {
            username: { value: string };
            password: { value: string };
          };

          authenticate(
            selectedData.username.value,
            selectedData.password.value)
            .catch((err) => setError(err));
        }}
      >
        <LabeledInput name={"username"} label={"Username"} type={"text"} />
        <LabeledInput name={"password"} label={"Password"} type={"password"} />
        <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
          Login
        </Button>
      </AuthForm>
    </Layout>
  )
}

export default Login;
