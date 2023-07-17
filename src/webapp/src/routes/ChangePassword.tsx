import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import { LabeledInput } from "../components/Forms";
import { Button } from "react-bootstrap";
import { changeCurrentUserPassword } from "../api/user";

const ChangePassword = () => {
    const [error, setError] = useState<Error>();

    return (
        <AuthForm 
            title="Schimba parola"
            error={error}
            setError={setError}
            onSubmit={(data) => {
                const selectedData = data as typeof data & {
                    currentPassword: { value: string };
                    newPassword: { value: string };
                    repeatPassword: { value: string };
                };

                if (selectedData.currentPassword.value === "" || selectedData.newPassword.value === "" || selectedData.repeatPassword.value === "") {
                    setError(new Error("Completeaza toate campurile."));
                    return;
                }

                if (selectedData.newPassword.value !== selectedData.repeatPassword.value) {
                    setError(new Error("Parolele nu se potrivesc."));
                    return;
                }

                if (selectedData.newPassword.value.length < 8) {
                    setError(new Error("Parola trebuie sa aiba minim 8 caractere."));
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
                label={"Parola actuală"}
                type={"password"}
            />

            <LabeledInput
                name={"newPassword"}
                label={"Noua parola"}
                type={"password"}
            />

            <LabeledInput
                name={"repeatPassword"}
                label={"Repetă parola"}
                type={"password"}
            />

            <Button type={"submit"} className={"btn btn-primary mx-auto"}>
                Confirmă
            </Button>
        </AuthForm>
    );
}

export default ChangePassword;