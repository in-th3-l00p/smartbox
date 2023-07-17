import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Button} from "react-bootstrap";
import {register} from "../api/user";
import useQuery from "../hooks/useQuery";
import {isAuthenticated} from "../api/authenticate";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
  const [error, setError] = useState<Error>();

  const [queryLoading, queryError] = useQuery(async () => {
    if (await isAuthenticated())
      window.location.href = "/";
  });

  if (queryLoading)
    return <LoadingSpinner />
  return (
    <AuthForm
      title="Înregistrare"
      error={error}
      setError={setError}
      onSubmit={(data) => {
        const selectedData = data as typeof data & {
          username: { value: string };
          firstName: { value: string };
          lastName: { value: string };
          email: { value: string };
          address: { value: string };
          password: { value: string };
          confirmPassword: { value: string }
        };
        if (
          !selectedData.username.value ||
          !selectedData.firstName.value ||
          !selectedData.lastName.value ||
          !selectedData.email.value ||
          !selectedData.address.value ||
          !selectedData.password.value ||
          !selectedData.confirmPassword.value
        ) {
          setError(new Error("Completează toate câmpurile."));
          return;
        }
        if (selectedData.password.value !== selectedData.confirmPassword.value) {
          setError(new Error("Parolele nu coincid."));
          return;
        }
        if (selectedData.password.value.length < 8) {
          setError(new Error("Parola trebuie să aibă cel puțin 8 caractere."));
          return;
        }
        register(
          selectedData.username.value,
          selectedData.firstName.value,
          selectedData.lastName.value,
          selectedData.address.value,
          selectedData.email.value,
          selectedData.password.value
        )
          .then(() => window.location.href = "/login?registered")
          .catch(err => setError(err));
      }}
    >
      <LabeledInput name={"username"} label={"Nume utilizator"} type={"text"} />
      <LabeledInput name={"firstName"} label={"Nume"} type={"text"} />
      <LabeledInput name={"lastName"} label={"Prenume"} type={"text"} />
      <LabeledInput name={"email"} label={"Email"} type={"email"} />
      <LabeledInput name={"address"} label={"Adresă"} type={"text"} />
      <LabeledInput name={"password"} label={"Parolă"} type={"password"} />
      <LabeledInput name={"confirmPassword"} label={"Confirmă parola"} type={"password"} />
      <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
        Înregistrează-te
      </Button>
    </AuthForm>
  );
}

export default Register;
