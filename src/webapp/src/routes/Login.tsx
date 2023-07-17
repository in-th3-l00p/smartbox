import React, {useState} from "react";
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
      title="Logare"
      error={error}
      setError={setError}
      onSubmit={(data) => {
        const selectedData = data as typeof data & {
          username: { value: string };
          password: { value: string };
        };

        if (selectedData.username.value === "" || selectedData.password.value === "") {
          setError(new Error("Completează toate câmpurile."));
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
          Contul a fost creat cu succes. Te poți loga acum.
        </Alert>
      ) : <></>}
      <LabeledInput name={"username"} label={"Nume utilizator"} type={"text"} />
      <LabeledInput name={"password"} label={"Parolă"} type={"password"} />
      <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
        Loghează-te
      </Button>
    </AuthForm>
  )
}

export default Login;
