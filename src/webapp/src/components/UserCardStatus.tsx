import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import List from "./List";
import {
  USER_DASHBOARD_CARD_STATUS_DEVICE_LOCATION,
  USER_DASHBOARD_CARD_STATUS_DEVICE_NAME,
  USER_DASHBOARD_CARD_STATUS_EMPTY,
  USER_DASHBOARD_CARD_STATUS_TITLE
} from "../utils/text";
import {CardSlot} from "../utils/dtos";

const UserCardStatus = () => {
  const auth = useContext(AuthContext);
  const cardSlots = useState<CardSlot[]>([]);
  useEffect(() => {

  });

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
            <h4>{USER_DASHBOARD_CARD_STATUS_DEVICE_NAME} {auth.userDetails.card.device.name}</h4>
            <h4>{USER_DASHBOARD_CARD_STATUS_DEVICE_LOCATION} {auth.userDetails.card.device.location}</h4>
          </div>
        )}
    </List>
  );
}

export default UserCardStatus;
