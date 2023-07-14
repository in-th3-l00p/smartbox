import React, {useEffect, useState} from "react";
import useQuery from "../hooks/useQuery";
import {User} from "../types/dtos";
import {getCurrentUserDetails, updateCurrentUser} from "../api/user";
import LoadingSpinner from "../components/LoadingSpinner";
import {Button, Container} from "react-bootstrap";
import style from "./../styles/Profile.module.scss";
import {LabeledInput} from "../components/Forms";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<User>({} as User);
  const [loading, queryError] = useQuery(async () => {
    setUserDetails(await getCurrentUserDetails());
  });
  const [error, setError] = useState<Error>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const setFields = () => {
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setAddress(userDetails.address);
    setEmail(userDetails.email);
  }

  const checkFieldsChanged = () => {
    return !(
      firstName === userDetails.firstName &&
      lastName === userDetails.lastName &&
      address === userDetails.address &&
      email === userDetails.email
    );
  }

  useEffect(() => {
    if (userDetails)
      setFields();
  }, [userDetails])

  if (loading)
    return <LoadingSpinner />
  return (
    <>
      <h1 className={style.title}>Your profile</h1>
      <Container className={style.principalContainer}>
        <img src={"/blank-pfp.webp"} alt={"profile"} className={style.pfp} />
        <form className={style.fieldsContainer} onSubmit={(e) => {
          e.preventDefault();
          updateCurrentUser(firstName, lastName, address, email)
            .then(() => console.log("success"))
            .catch(setError)
        }}>
          <LabeledInput
            name={"username"}
            label={"Username"}
            type={"text"}
            value={userDetails.login}
            readOnly={true}
          />
          <LabeledInput
            name={"firstName"}
            label={"First name"}
            type={"text"}
            value={firstName}
            setValue={setFirstName}
          />
          <LabeledInput
            name={"lastName"}
            label={"Last name"}
            type={"text"}
            value={lastName}
            setValue={setLastName}
          />
          <LabeledInput
            name={"address"}
            label={"Address"}
            type={"text"}
            value={address}
            setValue={setAddress}
          />
          <LabeledInput
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
              Save
            </Button>
            <Button
              type={"button"}
              disabled={!checkFieldsChanged()}
              onClick={setFields}
            >
              Discard
            </Button>
          </span>
        </form>
      </Container>
    </>
  )
}

export default Profile;
