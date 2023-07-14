import React, {useState} from "react";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Button} from "react-bootstrap";
import {register} from "../api/user";

const Register = () => {
  const [error, setError] = useState<Error>();

  return (
    <Layout>
      <AuthForm
        type={"register"}
        error={error}
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
          // todo: check for correct data
          if (selectedData.password.value !== selectedData.confirmPassword.value) {
            setError(new Error("Passwords do not match"));
            return;
          }
          register(
            selectedData.username.value,
            selectedData.firstName.value,
            selectedData.lastName.value,
            selectedData.email.value,
            selectedData.address.value,
            selectedData.password.value
          )
            .catch(err => setError(err));
        }}
      >
        <LabeledInput name={"username"} label={"Username"} type={"text"} />
        <LabeledInput name={"firstName"} label={"First name"} type={"text"} />
        <LabeledInput name={"lastName"} label={"Last name"} type={"text"} />
        <LabeledInput name={"email"} label={"Email"} type={"email"} />
        <LabeledInput name={"address"} label={"Address"} type={"text"} />
        <LabeledInput name={"password"} label={"Password"} type={"password"} />
        <LabeledInput name={"confirmPassword"} label={"Confirm password"} type={"password"} />
        <Button type={"submit"} variant={"primary"} className={"mx-auto"}>
          Submit
        </Button>
      </AuthForm>
    </Layout>
  );
}

export default Register;
