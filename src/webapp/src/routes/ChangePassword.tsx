import React, {useContext, useState} from "react";
import AuthForm from "../components/AuthForm";
import {LabeledInput} from "../components/Forms";
import {Button} from "react-bootstrap";
import {changeCurrentUserPassword} from "../api/user";
import {
  CHANGE_PASSWORD_BUTTON,
  CHANGE_PASSWORD_CONFIRM_PASSWORD,
  CHANGE_PASSWORD_NEW_PASSWORD,
  CHANGE_PASSWORD_OLD_PASSWORD,
  CHANGE_PASSWORD_TITLE,
  ERROR_PASSWORDS_DONT_MATCH,
  ERROR_SHROT_PASSWORD,
  ERROR_UNCOMPLETED_FIELDS
} from "../utils/text";
import {Navigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ChangePassword = () => {
    const auth = useContext(AuthContext);
    const [error, setError] = useState<Error>();

    if (!auth.isAuthenticated)
      return <Navigate to={"/login"} replace={true} />
    return (
        <AuthForm
            title={CHANGE_PASSWORD_TITLE}
            error={error}
            setError={setError}
            onSubmit={(data) => {
                const selectedData = data as typeof data & {
                    currentPassword: { value: string };
                    newPassword: { value: string };
                    repeatPassword: { value: string };
                };

                if (selectedData.currentPassword.value === "" || selectedData.newPassword.value === "" || selectedData.repeatPassword.value === "") {
                    setError(new Error(ERROR_UNCOMPLETED_FIELDS));
                    return;
                }

                if (selectedData.newPassword.value !== selectedData.repeatPassword.value) {
                    setError(new Error(ERROR_PASSWORDS_DONT_MATCH));
                    return;
                }

                if (selectedData.newPassword.value.length < 8) {
                    setError(new Error(ERROR_SHROT_PASSWORD));
                    return;
                }

                changeCurrentUserPassword(
                    selectedData.currentPassword.value,
                    selectedData.newPassword.value
                )
                    .then(() => window.location.href = "/profile?passwordChanged")
                    .catch((err) => setError(err));
            }}
        >
            <LabeledInput
                name={"currentPassword"}
                label={CHANGE_PASSWORD_OLD_PASSWORD}
                type={"password"}
            />

            <LabeledInput
                name={"newPassword"}
                label={CHANGE_PASSWORD_NEW_PASSWORD}
                type={"password"}
            />

            <LabeledInput
                name={"repeatPassword"}
                label={CHANGE_PASSWORD_CONFIRM_PASSWORD}
                type={"password"}
            />

            <Button type={"submit"} className={"btn btn-primary mx-auto"}>
              {CHANGE_PASSWORD_BUTTON}
            </Button>
        </AuthForm>
    );
}

export default ChangePassword;
