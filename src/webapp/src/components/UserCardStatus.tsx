import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import List from "./List";
import {
  USER_DASHBOARD_CARD_STATUS_DEVICE_LOCATION,
  USER_DASHBOARD_CARD_STATUS_DEVICE_NAME,
  USER_DASHBOARD_CARD_STATUS_EMPTY,
  USER_DASHBOARD_CARD_STATUS_ID,
  USER_DASHBOARD_CARD_STATUS_TITLE
} from "../utils/text";

const UserCardStatus = () => {
  const auth = useContext(AuthContext);

  return (
    <List title={USER_DASHBOARD_CARD_STATUS_TITLE}>
        {auth.userDetails.card === null ? (
          <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
            <h1 className={"my-auto mx-auto text-center"}>
              {USER_DASHBOARD_CARD_STATUS_EMPTY}
            </h1>
          </div>
        ) : (
          <div className={"p-4"}>
            <h4>{USER_DASHBOARD_CARD_STATUS_ID} {auth.userDetails.card.id}</h4>
            <h4>{USER_DASHBOARD_CARD_STATUS_DEVICE_NAME} {auth.userDetails.card.device.name}</h4>
            <h4>{USER_DASHBOARD_CARD_STATUS_DEVICE_LOCATION} {auth.userDetails.card.device.location}</h4>
          </div>
        )}
    </List>
  );
}

export default UserCardStatus;
