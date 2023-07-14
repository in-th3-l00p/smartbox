import React, {useState} from "react";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Alert, Button} from "react-bootstrap";
import {authenticate, isAuthenticated} from "../api/authenticate";
import {useSearchParams} from "react-router-dom";
import useQuery from "../hooks/useQuery";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<Error>();
  const [queryLoading, queryError] = useQuery(async () => {
    if (await isAuthenticated())
      window.location.href = "/";
  });

  if (queryLoading)
    return <LoadingSpinner />
  return (
    <AuthForm
      type={"login"}
      error={error}
      setError={setError}
      onSubmit={(data) => {
        const selectedData = data as typeof data & {
          username: { value: string };
          password: { value: string };
        };

        if (selectedData.username.value === "" || selectedData.password.value === "") {
          setError(new Error("Please fill out all fields."));
          return;
        }

        authenticate(
          selectedData.username.value,
          selectedData.password.value
        )
          .then(() => window.location.href = "/")
          .catch((err) => setError(err));
      }}
    >
      {searchParams[0].has("registered") ? (
        <Alert variant={"success"} dismissible>
          You have successfully registered! You can now login.
        </Alert>
      ) : <></>}
      <LabeledInput name={"username"} label={"Username"} type={"text"} />
      <LabeledInput name={"password"} label={"Password"} type={"password"} />
      <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
        Login
      </Button>
    </AuthForm>
  )
}

export default Login;
