import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import useQuery from "../hooks/useQuery";
import { Device, User } from "../types/dtos";
import { getUsers } from "../api/admin";
import style from "./../styles/Dashboard.module.scss";
import { createDevice, deleteDevice, getDevices, updateDevice } from "../api/device";
import { StatefulLabeledInput } from "./Forms";

const List: React.FC<{
    title: string;
    children?: JSX.Element | JSX.Element[] | any;
}> = ({ title, children }) => {
    return (
        <div className={style.listContainer}>
            <h3 className={style.title}>{title}</h3>
            <ul className={style.content}>
                {children}
            </ul>
        </div>
    );
}

// // shows all the devices registered
const DeviceList = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, _] = useQuery(async () => {
        setDevices(await getDevices());
    });

    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [createName, setCreateName] = useState<string>("");
    const [createLocation, setCreateLocation] = useState<string>("");
    const [createError, setCreateError] = useState<Error>();

    // used for modals whose purpose is to update/delete a device
    const [updateId, setUpdateId] = useState<number>(-1);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [updateName, setUpdateName] = useState<string>("");
    const [updateLocation, setUpdateLocation] = useState<string>("");
    const [updateError, setUpdateError] = useState<Error>();

    interface DeviceDisplayProps {
        device: Device;
        setUpdateId: React.Dispatch<React.SetStateAction<number>>;
        setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
        setUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }

    const DeviceDisplay: React.FC<DeviceDisplayProps> = ({ 
        device, setUpdateId, setUpdateOpen, setDeleteOpen 
    }) => {
        const [opened, setOpened] = useState<boolean>(false);

        return (
            <div className={style.element}>
                <div 
                    className={style.principalInfo} 
                    onClick={() => setOpened(!opened)}
                >
                    <p style={{fontSize: "1.35rem"}}>Dispozitiv: <b>{device.name}</b></p>
                </div>
                {opened && (
                    <div className={style.details}>
                        <div>
                            <p>Nume - <i>{device.name}</i></p>
                            <p>Locaţie - <i>{device.location}</i></p>
                        </div>
                        <div className={"d-flex flex-column gap-2"}>
                            <Button 
                                variant="danger w-100"
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Şterge dispozitivul"
                                onClick={() => {
                                    setUpdateId(device.id);
                                    setDeleteOpen(true);
                                }}
                            >
                                <i className="bi bi-trash" />
                            </Button>
                            <Button 
                                variant="primary w-100"
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Actualizează dispozitivul"
                                onClick={() => {
                                    setUpdateId(device.id);
                                    setUpdateOpen(true);
                                }}
                            >
                                <i className="bi bi-arrow-clockwise" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    if (loading)
        return <List title="Dispozitive" />
    return (
        <>
            <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizează dispozitivul</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {updateError !== undefined && (
                        <Alert 
                            variant="danger" 
                            onClose={() => setUpdateError(undefined)} 
                            dismissible
                        >
                            {updateError.message}
                        </Alert>
                    )}

                    <StatefulLabeledInput
                        type="text"
                        name="name"
                        label="Nume"
                        value={updateName}
                        setValue={setUpdateName}
                        className="mb-3"
                    />
                    <StatefulLabeledInput
                        type="text"
                        name="location"
                        label="Locaţie"
                        value={updateLocation}
                        setValue={setUpdateLocation}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        if (updateName.length === 0 && updateLocation.length === 0) {
                            setCreateError(new Error("Trebuie să completezi toate câmpurile!"));
                            return;
                        }

                        updateDevice(updateId, updateName, updateLocation)
                            .then(() => window.location.reload())
                            .catch(setUpdateError);
                    }}>
                        Confirmă
                    </Button>
                    <Button variant="danger" onClick={() => setShowUpdate(false)}>
                        Anulează
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eşti sigur că vrei să ştergi dispozitivul</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={() => {
                        deleteDevice(updateId)
                            .then(() => window.location.reload());
                    }}>
                        Confirmă
                    </Button>
                    <Button variant="danger" onClick={() => setShowDelete(false)}>
                        Anulează
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreate} onHide={() => setShowCreate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adaugă un nou dispozitiv</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={"text-center mb-3"}>Introdu informaţiile noului dispozitiv</p>
                    {createError !== undefined && (
                        <Alert 
                            variant="danger" 
                            onClose={() => setCreateError(undefined)} 
                            dismissible
                        >
                            {createError.message}
                        </Alert>
                    )}
                    <StatefulLabeledInput 
                        type="text"
                        name="name"
                        label="Nume" 
                        value={createName}
                        setValue={setCreateName}
                        className="mb-3"
                    />
                    <StatefulLabeledInput 
                        type="text"
                        name="location"
                        label="Locaţie" 
                        value={createLocation}
                        setValue={setCreateLocation}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        if (createName.length === 0 && createLocation.length === 0) {
                            setCreateError(new Error("Trebuie să completezi toate câmpurile!"));
                            return;
                        }

                        createDevice(createName, createLocation)
                            .then(() => window.location.reload())
                            .catch(setCreateError);
                    }}>
                        Adaugă
                    </Button>
                    <Button variant="danger" onClick={() => setShowCreate(false)}>
                        Anulează
                    </Button>
                </Modal.Footer>
            </Modal>

            <List title="Dispozitive">
                <div className={style.controlButtons}>
                    <Button 
                        className={style.controlButton}
                        onClick={() => setShowCreate(true)}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </Button>
                </div>
                {devices.map((device, index) => (
                    <li key={index}>
                        <DeviceDisplay 
                            device={device}  
                            setUpdateId={setUpdateId}
                            setUpdateOpen={setShowUpdate}
                            setDeleteOpen={setShowDelete}
                        />
                    </li>
                ))}
            </List>
        </>
    );
}

// shows all the users registered
const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, _] = useQuery(async () => {
        setUsers(await getUsers());
    });

    const UserDisplay: React.FC<{user: User}> = ({ user }) => {
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
                        </div>
                        <div className={"d-flex flex-column gap-2"}>
                            <Button 
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Modifică card"
                            ><i className="bi bi-person-vcard"></i></Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    if (loading)
        return <List title="Utilizatori" />
    return (
        <List title="Utilizatori">
            {users.map((user, index) => (
                <li key={index}><UserDisplay user={user} /></li>
            ))}
        </List>
    );
}

const AdminDashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <Container>
        <Row lg={2}>
            <Col>
                <UserList />
            </Col>
            <Col>
                <DeviceList />
            </Col>
        </Row>
    </Container>
  );
}

export default AdminDashboard;