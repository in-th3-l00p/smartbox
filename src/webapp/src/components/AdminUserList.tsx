import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import {Device, User} from "../utils/dtos";
import {getUsers} from "../api/admin";
import List from "./List";
import style from "./../styles/Dashboard.module.scss";
import {createCard, deleteCard, updateCard} from "../api/card";
import {
  ADMIN_DASHBOARD_USER_LIST_ADDRESS,
  ADMIN_DASHBOARD_USER_LIST_CARD,
  ADMIN_DASHBOARD_USER_LIST_CARD_EMPTY,
  ADMIN_DASHBOARD_USER_LIST_EMAIL,
  ADMIN_DASHBOARD_USER_LIST_FIRST_NAME,
  ADMIN_DASHBOARD_USER_LIST_LAST_NAME,
  ADMIN_DASHBOARD_USER_LIST_TITLE,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_BUTTON_PLACEHOLDER,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_DEVICE_LOCATION,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_DEVICE_NAME,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_ID,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_TITLE,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CLOSE_BUTTON,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CONFIRM_BUTTON,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DEFAULT_OPTION,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DELETE_BUTTON,
  ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_TEXT,
  ADMIN_DASHBOARD_USER_LIST_USERNAME
} from "../utils/text";

interface UserDisplayProps {
  user: User;
  setUpdateUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setShowEditCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user, setUpdateUser, setShowEditCard }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className={style.element}>
      <div
        className={style.principalInfo}
        onClick={() => setOpened(!opened)}
      >
        <img src={"/blank-pfp.webp"} alt="profile" className={style.pfp} />
        <p>{user.login} - {user.firstName} {user.lastName}</p>
      </div>
      {opened && (
        <div className={style.details}>
          <div>
            <p>{ADMIN_DASHBOARD_USER_LIST_USERNAME} - <i>{user.login}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_FIRST_NAME} - <i>{user.firstName}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_LAST_NAME} - <i>{user.lastName}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_ADDRESS} - <i>{user.address}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_EMAIL} - <i>{user.email}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_CARD} - <i>{user.card === null ? ADMIN_DASHBOARD_USER_LIST_CARD_EMPTY : user.card.device.name}</i></p>
          </div>
          <div className={"d-flex flex-column gap-2"}>
            <Button
              data-toggle="tooltip"
              data-placement="top"
              title={ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_BUTTON_PLACEHOLDER}
              onClick={() => {
                setUpdateUser(user);
                setShowEditCard(true);
              }}
            >
              <i className="bi bi-person-vcard"></i>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


const AdminUserList: React.FC<{ devices: Device[] }> = ({ devices }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, _] = useQuery(async () => {
    setUsers(await getUsers());
  });

  const [updateUser, setUpdateUser] = useState<User>();
  const [showEditCard, setShowEditCard] = useState<boolean>(false);
  const [selectDeviceId, setSelectDeviceId] = useState<number>(0);

  if (loading)
    return <List title={ADMIN_DASHBOARD_USER_LIST_TITLE} />
  return (
    <>
      <Modal show={showEditCard} onHide={() => setShowEditCard(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateUser?.card === null ? (
            <>
              <p>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_TEXT}</p>
              <Form.Select
                className={"mb-3"}
                onChange={(e) => setSelectDeviceId(parseInt(e.target.value))}
              >
                <option>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DEFAULT_OPTION}</option>
                {devices.map((device, index) => (
                  <option key={index} value={device.id}>{device.name}</option>
                ))}
              </Form.Select>
              <Button
                onClick={() => {
                  createCard(updateUser!.id, selectDeviceId)
                    .then(card => {
                      const newUsers = [...users];
                      setUsers(newUsers.map(user => {
                        if (user.id === updateUser!.id)
                          user.card = card;
                        return user;
                      }));
                      setShowEditCard(false);
                    });
                }}
                disabled={selectDeviceId === 0}
              >
                {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CONFIRM_BUTTON}
              </Button>
            </>
        ): (
          <>
            <div className={"mb-3 border-bottom pb-2"}>
              <p>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_ID} <i>{updateUser?.card?.id}</i></p>
              <p>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_DEVICE_NAME} <i>{updateUser?.card?.device.name}</i></p>
              <p>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_DEVICE_LOCATION} <i>{updateUser?.card?.device.location}</i></p>
            </div>
            <p>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_TEXT}</p>
            <Form.Select
              className={"mb-3"}
              onChange={(e) => setSelectDeviceId(parseInt(e.target.value))}
            >
              <option>{ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DEFAULT_OPTION}</option>
              {devices.map((device, index) => (
                <option key={index} value={device.id}>{device.name}</option>
              ))}
            </Form.Select>
            <Button
              className={"mb-3"}
              onClick={() => {
                updateCard(updateUser?.card?.id || 0, selectDeviceId)
                  .then(card => {
                    const newUsers = [...users];
                    setUsers(newUsers.map(user => {
                      if (user.id === updateUser!.id)
                        user.card = card;
                      return user;
                    }));
                    setShowEditCard(false);
                  });
              }}
              disabled={selectDeviceId === 0}
            >
              {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CONFIRM_BUTTON}
            </Button>
            <br />
            <Button
              variant={"danger"}
              onClick={() => {
                deleteCard(updateUser?.card?.id || 0)
                  .then(() => {
                    const newUsers = [...users];
                    setUsers(newUsers.map(user => {
                      if (user.id === updateUser!.id)
                        user.card = null;
                      return user;
                    }));
                    setShowEditCard(false);
                  })
              }}
            >
              {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DELETE_BUTTON}
            </Button>
          </>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowEditCard(false)}>
            {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CLOSE_BUTTON}
          </Button>
        </Modal.Footer>
      </Modal>
      <List title={ADMIN_DASHBOARD_USER_LIST_TITLE}>
        {users.map((user, index) => (
          <li key={index}>
            <UserDisplay
              user={user}
              setUpdateUser={setUpdateUser}
              setShowEditCard={setShowEditCard}
            />
          </li>
        ))}
      </List>
    </>
  );
}

export default AdminUserList;
