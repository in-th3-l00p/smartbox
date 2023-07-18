import React, {useContext, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import List from "./List";

const UserCardStatus = () => {
  const auth = useContext(AuthContext);
  useEffect(() => console.log(auth), [])

  return (
    <List title={"Status card"}>
        {auth.userDetails.card === null ? (
          <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
            <h1 className={"my-auto mx-auto"}>Nu ai card</h1>
          </div>
        ) : (
          <div className={"p-4"}>
            <h4>ID card: {auth.userDetails.card.id}</h4>
            <h4>Nume dispozitiv: {auth.userDetails.card.device.name}</h4>
            <h4>Locație dispozitiv: {auth.userDetails.card.device.location}</h4>
          </div>
        )}
    </List>
  );
}

export default UserCardStatus;
