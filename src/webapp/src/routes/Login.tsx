import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Alert, Button} from "react-bootstrap";
import {authenticate, isAuthenticated} from "../api/authenticate";
import {useSearchParams} from "react-router-dom";
import useQuery from "../hooks/useQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ERROR_UNCOMPLETED_FIELDS,
  LOGIN_BUTTON,
  LOGIN_PASSWORD,
  LOGIN_SUCCESS_REGISTER,
  LOGIN_TITLE,
  LOGIN_USERNAME
} from "../utils/text";

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
      title={LOGIN_TITLE}
      error={error}
      setError={setError}
      onSubmit={(data) => {
        const selectedData = data as typeof data & {
          username: { value: string };
          password: { value: string };
        };

        if (selectedData.username.value === "" || selectedData.password.value === "") {
          setError(new Error(ERROR_UNCOMPLETED_FIELDS));
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
        <Alert variant={"success"} dismissible>{LOGIN_SUCCESS_REGISTER}</Alert>
      ) : <></>}
      <LabeledInput name={"username"} label={LOGIN_USERNAME} type={"text"} />
      <LabeledInput name={"password"} label={LOGIN_PASSWORD} type={"password"} />
      <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
        {LOGIN_BUTTON}
      </Button>
    </AuthForm>
  )
}

export default Login;
