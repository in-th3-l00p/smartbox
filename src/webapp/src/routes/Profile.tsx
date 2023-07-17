import React, {useContext, useEffect, useState} from "react";
import {updateCurrentUser} from "../api/user";
import {Alert, Button, Container} from "react-bootstrap";
import style from "./../styles/Profile.module.scss";
import {StatefulLabeledInput} from "../components/Forms";
import AuthContext from "../context/AuthContext";
import {useSearchParams} from "react-router-dom";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState<Error>();
  const params = useSearchParams();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const setFields = () => {
    setFirstName(auth.userDetails.firstName);
    setLastName(auth.userDetails.lastName);
    setAddress(auth.userDetails.address);
    setEmail(auth.userDetails.email);
  }

  const checkFieldsChanged = () => {
    return !(
      firstName === auth.userDetails.firstName &&
      lastName === auth.userDetails.lastName &&
      address === auth.userDetails.address &&
      email === auth.userDetails.email
    );
  }

  useEffect(() => {
    setFields();
  }, [])

  return (
    <>
      <h1 className={style.title}>Profilul tău</h1>
      <Container className={style.principalContainer}>
        <img src={"/blank-pfp.webp"} alt={"profile"} className={style.pfp} />
        <form className={style.fieldsContainer} onSubmit={(e) => {
          e.preventDefault();
          updateCurrentUser(
            auth.userDetails.login,
            firstName,
            lastName,
            address,
            email
          )
            .then(() => window.location.href = "/profile?profileUpdated")
            .catch(setError);
        }}>
          {params[0].has("profileUpdated") && (
            <Alert variant="success" dismissible>
              Profilul a fost actualizat cu succes!
            </Alert>
          )}
          {params[0].has("passwordChanged") && (
            <Alert variant="success" dismissible>
              Parola a fost schimbată cu succes!
            </Alert>
          )}
          <StatefulLabeledInput
            name={"username"}
            label={"Nume utilizator"}
            type={"text"}
            value={auth.userDetails.login}
            setValue={() => {}}
            readOnly={true}
          />
          <StatefulLabeledInput
            name={"firstName"}
            label={"Nume"}
            type={"text"}
            value={firstName}
            setValue={setFirstName}
          />
          <StatefulLabeledInput
            name={"lastName"}
            label={"Prenume"}
            type={"text"}
            value={lastName}
            setValue={setLastName}
          />
          <StatefulLabeledInput
            name={"address"}
            label={"Adresă"}
            type={"text"}
            value={address}
            setValue={setAddress}
          />
          <StatefulLabeledInput
            name={"email"}
            label={"Email"}
            type={"text"}
            value={email}
            setValue={setEmail}
          />
          <span className={"ms-auto"}>
            <Button
              type={"submit"}
              variant={"danger"}
              className={"me-3"}
              disabled={
                !checkFieldsChanged()
                || !firstName
                || !lastName
                || !address
                || !email}
            >
              Salvează
            </Button>
            <Button
              type={"button"}
              disabled={!checkFieldsChanged()}
              onClick={setFields}
            >
              Anulează
            </Button>
            <br />
            <a href="/changePassword">
              <Button
                type={"button"}
                variant={"success"}
                className={"mt-3"}
              >
                Schimbă parola
              </Button>
            </a>
          </span>
        </form>
      </Container>
    </>
  )
}

export default Profile;
