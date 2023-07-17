import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import {Device, User} from "../utils/dtos";
import {getUsers} from "../api/admin";
import List from "./List";
import style from "./../styles/Dashboard.module.scss";
import {createCard, deleteCard, updateCard} from "../api/card";

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
            <p>Nume utilizator - <i>{user.login}</i></p>
            <p>Nume - <i>{user.firstName}</i></p>
            <p>Prenume - <i>{user.lastName}</i></p>
            <p>Adresă - <i>{user.email}</i></p>
            <p>Email - <i>{user.email}</i></p>
            <p>Card - <i>{user.card === null ? "nu are" : user.card.device.name}</i></p>
          </div>
          <div className={"d-flex flex-column gap-2"}>
            <Button
              data-toggle="tooltip"
              data-placement="top"
              title="Modifică card"
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
    return <List title="Utilizatori" />
  return (
    <>
      <Modal show={showEditCard} onHide={() => setShowEditCard(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Status card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateUser?.card === null ? (
            <>
              <p>Selectează locația noului card:</p>
              <Form.Select
                className={"mb-3"}
                onChange={(e) => setSelectDeviceId(parseInt(e.target.value))}
              >
                <option>Selectează o opțiune</option>
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
                Confirmă
              </Button>
            </>
        ): (
          <>
            <div className={"mb-3 border-bottom pb-2"}>
              <p>Id card: <i>{updateUser?.card?.id}</i></p>
              <p>Dispozitivul cardului: <i>{updateUser?.card?.device.name}</i></p>
              <p>Locația dispozitivului cardului: <i>{updateUser?.card?.device.location}</i></p>
            </div>
            <p>Schimbă dispozitivul cardului:</p>
            <Form.Select
              className={"mb-3"}
              onChange={(e) => setSelectDeviceId(parseInt(e.target.value))}
            >
              <option>Selectează o opțiune</option>
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
              Confirmă
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
              Șterge cardul
            </Button>
          </>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowEditCard(false)}>
            Închide
          </Button>
        </Modal.Footer>
      </Modal>
      <List title="Utilizatori">
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
