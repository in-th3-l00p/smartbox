import React,{useState} from "react";
import {Notification} from "../utils/dtos";
import {Button} from "react-bootstrap";
import List from "./List";
import style from "../styles/Dashboard.module.scss";
import {updateNotificationStatus} from "../api/notification";
interface NotificationDisplayProps{
  notification:Notification;
}

const OperatorNotificationList = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 0,
      deviceId: 1,
      slotId: 2,
      finished: true,
    },
    {
      id: 1,
      deviceId: 3,
      slotId: 2,
      finished: false,
    },


  ])
  const NotificationDisplay:React.FC<NotificationDisplayProps>=({
                                                                 notification
                                                               }) => {
    if(!notification.finished){
      return (

        <div className={style.element} >
          <div className={style.principalInfo}>
            <p style={{fontSize: "1.35rem"}}>Compartimentul <b>{notification.slotId}</b> de la
              pubela <b>{notification.deviceId}</b> a ajuns la 90%  </p>
            <Button
              variant="success"
              data-toggle="tooltip"
              data-placement="top"
              title="Sterge notificarea"
              onClick={() => {
                updateNotificationStatus(notification.id)
              }}
            >
              <i className="bi bi-check" />
            </Button>
          </div>

        </div>)
    } else
      return (
        <div></div>

    )
  }

  return (
    <List title="Notifications">
          <div className="m-2">
              {notifications.map((notification)=>
              <NotificationDisplay
            notification={notification}
              />
              )}
          </div>
      </List>
  )
}




export default OperatorNotificationList;
