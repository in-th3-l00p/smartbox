import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Modal, Table} from "react-bootstrap";
import {Authority, CardSlot, Device, getAuthorityText, User} from "../utils/dtos";
import {createUser, getUsers, updateUserDetails} from "../api/admin";
import List from "./List";
import style from "./../styles/Dashboard.module.scss";
import {createCard, deleteCard, updateCard} from "../api/card";
import {
  ADMIN_DASHBOARD_USER_LIST_ADDRESS,
  ADMIN_DASHBOARD_USER_LIST_AUTHORITY,
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
import {StatefulLabeledInput} from "./Forms";

interface UpdateUserModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: User;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ show, setShow, updateUser, users, setUsers }) => {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [authority, setAuthority] = useState<Authority>("ROLE_USER");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (show) {
      setUsername(updateUser.login);
      setFirstName(updateUser.firstName);
      setLastName(updateUser.lastName);
      setEmail(updateUser.email);
      setAddress(updateUser.address);
      setAuthority(updateUser.authorities[0]);
    }
  }, [show])
  if (!show && updateUser)
    return <></>
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizează datele utilizatorului</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert
            variant={"danger"}
            onClose={() => setError(undefined)}
            dismissible
          >
            {error.message}
          </Alert>
        )}

        <Form className={"d-flex flex-column gap-3"}>
          <StatefulLabeledInput
            name={"username"}
            type={"text"}
            label={"Nume de utilizator"}
            value={username}
            setValue={setUsername}
          />
          <StatefulLabeledInput
            name={"firstName"}
            type={"text"}
            label={"Prenume"}
            value={firstName}
            setValue={setFirstName}
          />
          <StatefulLabeledInput
            name={"lastName"}
            type={"text"}
            label={"Nume"}
            value={lastName}
            setValue={setLastName}
          />
          <StatefulLabeledInput
            name={"email"}
            type={"email"}
            label={"Email"}
            value={email}
            setValue={setEmail}
          />
          <StatefulLabeledInput
            name={"address"}
            type={"text"}
            label={"Adresă"}
            value={address}
            setValue={setAddress}
          />
          <Form.Group className={"mb-3"}>
            <Form.Label>Rol</Form.Label>
            <Form.Select value={authority} onChange={(e) => {
              setAuthority(e.target.value as Authority)
            }}>
              <option value="ROLE_USER">Utilizator</option>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_GENERATOR">Generator</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!username || !firstName || !lastName || !email || !address || !authority}
          variant="primary"
          onClick={() => {
            updateUserDetails(
              updateUser.id,
              username,
              firstName,
              lastName,
              address,
              email,
              authority
            )
              .then(() => window.location.reload())
              .catch(setError);
          }}
        >
          Confirmă
        </Button>
        <Button
          variant="danger"
          onClick={() => setShow(false)}
        >
          Anulează
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

interface ShowCardModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: User;
  setUpdateUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  devices: Device[];
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ShowCardModal: React.FC<ShowCardModalProps> = ({ show, setShow, updateUser, setUpdateUser, users, setUsers, devices }) => {
  const [selectDeviceId, setSelectDeviceId] = useState<number>(0);
  const [cardSlots, setCardSlots] = useState<CardSlot[]>([]);

  useEffect(() => {
    setUpdateUser(users.find((user) => user.id === updateUser?.id));
  }, [users]);

  useEffect(() => {
    if (updateUser)
      setCardSlots(updateUser.card?.cardSlots.sort(
        (a, b) => a.slotName.localeCompare(b.slotName)
      ) || []);
  }, [updateUser]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
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
                    getUsers().then(setUsers);
                    setShow(false);
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
            <div className={"mb-3 border-bottom pb-2"}>
              <div className={"d-flex justify-content-between align-items-center mb-3"}>
                <p>Activitate pubelă:</p>
                <Button
                  variant={"secondary"}
                  className={"ms-auto"}
                  style={{borderRadius: "50%", aspectRatio: "1/1"}}
                  onClick={() => {
                    getUsers().then(setUsers);
                  }}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </Button>
              </div>
              <Table striped bordered hover size={"lg"}>
                <thead>
                  <tr>
                    {cardSlots.map((cardSlot, index) => (
                      <th key={index}>{cardSlot.slotName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {cardSlots.map((cardSlot, index) => (
                      <td key={index}>{cardSlot.value}</td>
                    ))}
                  </tr>
                </tbody>
              </Table>
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
                    setShow(false);
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
                    setShow(false);
                  })
              }}
            >
              {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_DELETE_BUTTON}
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShow(false)}>
          {ADMIN_DASHBOARD_USER_LIST_UPDATE_CARD_MODAL_UPDATE_CLOSE_BUTTON}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface UserDisplayProps {
  user: User;
  setUpdateUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setShowEditCard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user, setUpdateUser, setShowEditCard, setShowUpdateUser }) => {
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
            <p>{ADMIN_DASHBOARD_USER_LIST_AUTHORITY} - <i>{getAuthorityText(user.authorities[0])}</i></p>
            <p>{ADMIN_DASHBOARD_USER_LIST_CARD} - <i>{user.card === null ? ADMIN_DASHBOARD_USER_LIST_CARD_EMPTY : user.card.device.name}</i></p>
          </div>
          <div className={"d-flex flex-column gap-2"}>
            <Button
              data-toggle="tooltip"
              data-placement="top"
              title={"Updatează datele utilizatorului"}
              onClick={() => {
                setUpdateUser(user);
                setShowUpdateUser(true);
              }}
            >
              <i className="bi bi-arrow-clockwise" />
            </Button>
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

interface AddUserModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, setShow }) => {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [authority, setAuthority] = useState<Authority>("ROLE_USER");
  const [error, setError] = useState<Error>();

  if (!show)
    return <></>;
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Crează un nou utilizator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert
            variant={"danger"}
            onClose={() => setError(undefined)}
            dismissible
          >
            {error.message}
          </Alert>
        )}
        <p className={"text-center"}>Parola utilizatorului va fi: <b>test1234</b>. Intră pe cont pentru a schimba-o.</p>
        <StatefulLabeledInput
          name="Username"
          label="Username"
          type="text"
          value={username}
          setValue={setUsername}
          className={"mb-3"}
        />
        <StatefulLabeledInput
          name="firstName"
          label="Prenume"
          type="text"
          value={firstName}
          setValue={setFirstName}
          className={"mb-3"}
        />
        <StatefulLabeledInput
          name="lastName"
          label="Nume"
          type="text"
          value={lastName}
          setValue={setLastName}
          className={"mb-3"}
        />
        <StatefulLabeledInput
          name="address"
          label="Adresă"
          type="text"
          value={address}
          setValue={setAddress}
          className={"mb-3"}
        />
        <StatefulLabeledInput
          name="email"
          label="Adresă de email"
          type="email"
          value={email}
          setValue={setEmail}
          className={"mb-3"}
        />
        <Form.Group className={"mb-3"}>
          <Form.Label>Rol</Form.Label>
          <Form.Select value={authority} onChange={(e) => {
            setAuthority(e.target.value as Authority)
          }}>
            <option value="ROLE_USER">Utilizator</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_GENERATOR">Generator</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!username || !firstName || !lastName || !address || !email}
          onClick={() => {
            if (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
              setError(new Error("Adresa de email este invalidă!"));
              return;
            }
            createUser(username, firstName, lastName, address, email, authority)
              .then(() => window.location.reload())
              .catch(setError);
          }}
        >
          Adaugă
        </Button>
        <Button variant={"danger"} onClick={() => setShow(false)}>Închide</Button>
      </Modal.Footer>
    </Modal>
  );
}

interface AdminUserListProps {
  devices: Device[];
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AdminUserList: React.FC<AdminUserListProps> = ({ devices, users, setUsers }) => {
  const [updateUser, setUpdateUser] = useState<User>();
  const [showEditCard, setShowEditCard] = useState<boolean>(false);

  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);

  return (
    <>
      <UpdateUserModal
        show={showUpdateUser}
        setShow={setShowUpdateUser}
        updateUser={updateUser as User}
        users={users}
        setUsers={setUsers}
      />
      <AddUserModal show={showAddUser} setShow={setShowAddUser} />
      <ShowCardModal
        show={showEditCard}
        setShow={setShowEditCard}
        updateUser={updateUser as User}
        setUpdateUser={setUpdateUser}
        devices={devices}
        users={users}
        setUsers={setUsers}
      />
      <List title={ADMIN_DASHBOARD_USER_LIST_TITLE}>
        <div className={style.controlButtons}>
          <Button
            data-toggle="tooltip"
            data-placement="top"
            title={"Adaugă un utiliazator"}
            className={style.controlButton}
            onClick={() => setShowAddUser(true)}
          >
            <i className="bi bi-plus-circle"></i>
          </Button>
          <Button
            variant={"secondary"}
            className={"ms-auto"}
            style={{borderRadius: "50%", aspectRatio: "1/1"}}
            onClick={() => {
              getUsers().then(setUsers);
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </div>
        {users.map((user, index) => (
          <UserDisplay
            key={index}
            user={user}
            setUpdateUser={setUpdateUser}
            setShowEditCard={setShowEditCard}
            setShowUpdateUser={setShowUpdateUser}
          />
        ))}
      </List>
    </>
  );
}

export default AdminUserList;
