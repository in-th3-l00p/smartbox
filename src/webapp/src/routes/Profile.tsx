import React, {useContext, useEffect, useState} from "react";
import {updateCurrentUser} from "../api/user";
import {Alert, Button, Container} from "react-bootstrap";
import style from "./../styles/Profile.module.scss";
import {StatefulLabeledInput} from "../components/Forms";
import AuthContext from "../context/AuthContext";
import {useSearchParams} from "react-router-dom";
import {
  PROFILE_ADDRESS,
  PROFILE_CHANGE_PASSWORD_BUTTON,
  PROFILE_EMAIL,
  PROFILE_FIRST_NAME,
  PROFILE_LAST_NAME,
  PROFILE_SUCCESS_PASSWORD_CHANGE,
  PROFILE_SUCCESS_UPDATE,
  PROFILE_TITLE,
  PROFILE_UPDATE_BUTTON,
  PROFILE_UPDATE_CANCEL_BUTTON,
  PROFILE_USERNAME
} from "../utils/text";

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
      <h1 className={style.title}>{PROFILE_TITLE}</h1>
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
            <Alert variant="success" dismissible>{PROFILE_SUCCESS_UPDATE}</Alert>
          )}
          {params[0].has("passwordChanged") && (
            <Alert variant="success" dismissible>{PROFILE_SUCCESS_PASSWORD_CHANGE}</Alert>
          )}
          <StatefulLabeledInput
            name={"username"}
            label={PROFILE_USERNAME}
            type={"text"}
            value={auth.userDetails.login}
            setValue={() => {}}
            readOnly={true}
          />
          <StatefulLabeledInput
            name={"firstName"}
            label={PROFILE_FIRST_NAME}
            type={"text"}
            value={firstName}
            setValue={setFirstName}
          />
          <StatefulLabeledInput
            name={"lastName"}
            label={PROFILE_LAST_NAME}
            type={"text"}
            value={lastName}
            setValue={setLastName}
          />
          <StatefulLabeledInput
            name={"address"}
            label={PROFILE_ADDRESS}
            type={"text"}
            value={address}
            setValue={setAddress}
          />
          <StatefulLabeledInput
            name={"email"}
            label={PROFILE_EMAIL}
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
              {PROFILE_UPDATE_BUTTON}
            </Button>
            <Button
              type={"button"}
              disabled={!checkFieldsChanged()}
              onClick={setFields}
            >
              {PROFILE_UPDATE_CANCEL_BUTTON}
            </Button>
            <br />
            <a href="/changePassword">
              <Button
                type={"button"}
                variant={"success"}
                className={"mt-3"}
              >
                {PROFILE_CHANGE_PASSWORD_BUTTON}
              </Button>
            </a>
          </span>
        </form>
      </Container>
    </>
  )
}

export default Profile;
