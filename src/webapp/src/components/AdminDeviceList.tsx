import React, {useState} from "react";
import {Device} from "../utils/dtos";
import {createDevice, deleteDevice, updateDevice} from "../api/device";
import style from "../styles/Dashboard.module.scss";
import {Alert, Button, Modal} from "react-bootstrap";
import List from "./List";
import {StatefulLabeledInput} from "./Forms";
import {addSlot, removeSlot} from "../api/slot";

interface DeviceDisplayProps {
  device: Device;
  setUpdateId: (id: number) => void;
  setUpdateOpen: (open: boolean) => void;
  setDeleteOpen: (open: boolean) => void;
  setShowSlots: (show: boolean) => void;
}

const DeviceDisplay: React.FC<DeviceDisplayProps> = (
  { device, setUpdateId, setUpdateOpen, setDeleteOpen, setShowSlots }
) => {
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
            <p>ID - <i>{device.id}</i></p>
            <p>Nume - <i>{device.name}</i></p>
            <p>Locaţie - <i>{device.location}</i></p>
            <p>Fante - <i>{device.slots.length}</i></p>
          </div>
          <div className={"d-flex flex-column gap-2"}>
            <Button
              variant="danger"
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
              variant="primary"
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
            <Button
              variant="info"
              data-toggle="tooltip"
              data-placement="top"
              title="Modifică fantele dispozitivului"
              onClick={() => {
                setUpdateId(device.id);
                setShowSlots(true);
              }}
            >
              <i className="bi bi-archive" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

interface AdminDeviceListProps {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const AdminDeviceList: React.FC<AdminDeviceListProps> = ({ devices, setDevices }) => {
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
  const [showSlots, setShowSlots] = useState<boolean>(false);
  const [slotCapacity, setSlotCapacity] = useState<string>("");
  const [createSlotError, setCreateSlotError] = useState<Error>();

  return (
    <>
      <Modal show={showSlots} onHide={() => setShowSlots(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Statusul fantelor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={"pb-2 mb-2 border-bottom"}>
            {createSlotError && (
              <Alert
                variant={"danger"}
                onClose={() => setCreateSlotError(undefined)}
                dismissible
              >
                {createSlotError.message}
              </Alert>
            )}
            <Button onClick={() => {
              addSlot(updateId)
                .then(slot => {
                  const newDevices = [...devices];
                  setDevices(newDevices.map((device) => {
                    if (device.id === updateId) {
                      return {
                        ...device,
                        slots: [...device.slots, slot]
                      }
                    }
                    return device;
                  }));
                })
                .catch(setCreateSlotError);
            }}>Adaugă</Button>
          </div>
          <div>
            <h4>Fantele existente</h4>
            <ul className={"d-flex flex-column gap-2"}>
              {devices.find((device) => device.id === updateId)?.slots.map((slot, index) => (
                <li key={index}>
                  <div className={"d-flex flex-row justify-content-between align-items-center"}>
                    <p>Fanta {index + 1} - Volum: {slot.volume}</p>
                    <Button
                      variant="danger"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Şterge fanta"
                      onClick={() => {
                        removeSlot(slot.id)
                          .then(() => {
                            const newDevices = [...devices];
                            setDevices(newDevices.map((device) => {
                              if (device.id === updateId) {
                                return {
                                  ...device,
                                  slots: device.slots.filter((s) => s.id !== slot.id)
                                }
                              }
                              return device;
                            }));
                          })
                      }}
                    >
                      <i className="bi bi-trash" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowSlots(false)}>
            Închide
          </Button>
        </Modal.Footer>
      </Modal>

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
              setShowSlots={setShowSlots}
            />
          </li>
        ))}
      </List>
    </>
  );
}

export default AdminDeviceList;
