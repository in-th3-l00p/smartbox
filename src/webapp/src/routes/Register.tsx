import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Button} from "react-bootstrap";
import {register} from "../api/user";
import useQuery from "../hooks/useQuery";
import {isAuthenticated} from "../api/authenticate";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ERROR_PASSWORDS_DONT_MATCH,
  ERROR_SHROT_PASSWORD,
  ERROR_UNCOMPLETED_FIELDS,
  REGISTER_ADDRESS,
  REGISTER_BUTTON,
  REGISTER_CONFIRM_PASSWORD,
  REGISTER_EMAIL,
  REGISTER_FIRST_NAME,
  REGISTER_LAST_NAME,
  REGISTER_PASSWORD,
  REGISTER_TITLE,
  REGISTER_USERNAME
} from "../utils/text";

const Register = () => {
  const [error, setError] = useState<Error>();

  const [queryLoading, _] = useQuery(async () => {
    if (await isAuthenticated())
      window.location.href = "/";
  });

  if (queryLoading)
    return <LoadingSpinner />
  return (
    <AuthForm
      title={REGISTER_TITLE}
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
          setError(new Error(ERROR_UNCOMPLETED_FIELDS));
          return;
        }
        if (selectedData.password.value !== selectedData.confirmPassword.value) {
          setError(new Error(ERROR_PASSWORDS_DONT_MATCH));
          return;
        }
        if (selectedData.password.value.length < 8) {
          setError(new Error(ERROR_SHROT_PASSWORD));
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
      <LabeledInput name={"username"} label={REGISTER_USERNAME} type={"text"} />
      <LabeledInput name={"firstName"} label={REGISTER_FIRST_NAME} type={"text"} />
      <LabeledInput name={"lastName"} label={REGISTER_LAST_NAME} type={"text"} />
      <LabeledInput name={"email"} label={REGISTER_EMAIL} type={"email"} />
      <LabeledInput name={"address"} label={REGISTER_ADDRESS} type={"text"} />
      <LabeledInput name={"password"} label={REGISTER_PASSWORD} type={"password"} />
      <LabeledInput name={"confirmPassword"} label={REGISTER_CONFIRM_PASSWORD} type={"password"} />
      <Button type={"submit"} variant={"primary"} className={"mx-auto"}>{REGISTER_BUTTON}</Button>
    </AuthForm>
  );
}

export default Register;
