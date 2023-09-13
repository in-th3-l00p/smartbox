import React, {useState} from "react";
import {Device} from "../utils/dtos";
import {createDevice, deleteDevice, getDevices, updateDevice} from "../api/device";
import style from "../styles/Dashboard.module.scss";
import {Alert, Button, Modal} from "react-bootstrap";
import List from "./List";
import {StatefulLabeledInput} from "./Forms";
import {addSlot, removeSlot} from "../api/slot";
import {
  ADMIN_DASHBOARD_ADD_DEVICE_MODAL_SUBTITLE,
  ADMIN_DASHBOARD_ADD_DEVICE_MODAL_TITLE,
  ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_CLOSE_BUTTON,
  ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_CONFIRM_BUTTON,
  ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_TITLE,
  ADMIN_DASHBOARD_DEVICE_LIST_ADD_PLACEHOLDER,
  ADMIN_DASHBOARD_DEVICE_LIST_DELETE_PLACEHOLDER,
  ADMIN_DASHBOARD_DEVICE_LIST_ID,
  ADMIN_DASHBOARD_DEVICE_LIST_LOCATION,
  ADMIN_DASHBOARD_DEVICE_LIST_NAME,
  ADMIN_DASHBOARD_DEVICE_LIST_SLOTS,
  ADMIN_DASHBOARD_DEVICE_LIST_TITLE,
  ADMIN_DASHBOARD_DEVICE_LIST_UPDATE_PLACEHOLDER,
  ADMIN_DASHBOARD_DEVICE_LIST_UPDATE_SLOTS_PLACEHOLDER,
  ADMIN_DASHBOARD_EXISTING_SLOTS,
  ADMIN_DASHBOARD_SLOTS_MODAL_ADD_BUTTON,
  ADMIN_DASHBOARD_SLOTS_MODAL_CLOSE_BUTTON,
  ADMIN_DASHBOARD_SLOTS_MODAL_TITLE,
  ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_CLOSE_BUTTON,
  ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_CONFIRM_BUTTON,
  ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_LOCATION,
  ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_NAME,
  ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_TITLE,
  ERROR_UNCOMPLETED_FIELDS
} from "../utils/text";

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
            <p>{ADMIN_DASHBOARD_DEVICE_LIST_ID} - <i>{device.id}</i></p>
            <p>{ADMIN_DASHBOARD_DEVICE_LIST_NAME} - <i>{device.name}</i></p>
            <p>{ADMIN_DASHBOARD_DEVICE_LIST_LOCATION} - <i>{device.location}</i></p>
            <p>{ADMIN_DASHBOARD_DEVICE_LIST_SLOTS} - <i>{device.slots.length}</i></p>
          </div>
          <div className={"d-flex flex-column gap-2"}>
            <Button
              variant="danger"
              data-toggle="tooltip"
              data-placement="top"
              title={ADMIN_DASHBOARD_DEVICE_LIST_DELETE_PLACEHOLDER}
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
              title={ADMIN_DASHBOARD_DEVICE_LIST_UPDATE_PLACEHOLDER}
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
              title={ADMIN_DASHBOARD_DEVICE_LIST_UPDATE_SLOTS_PLACEHOLDER}
              onClick={() => {
                setUpdateId(device.id);
                setShowSlots(true);
              }}
            >
              <i className="bi bi-archive" />
            </Button>
            <Button
              variant="primary"
              data-toggle="tooltip"
              data-placement="top"
              title={"Status"}
              onClick={() => window.location.href = "/admin/device/" + device.id}
            >
              <i className="bi bi-archive-fill"></i>
            </Button>
            <Button
              variant="success"
              data-toggle="tooltip"
              data-placement="top"
              title={"Carduri"}
              onClick={() => {
                setUpdateId(device.id);
                setShowSlots(true);
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
  const [slotName, setSlotName] = useState<string>("");
  const [createSlotError, setCreateSlotError] = useState<Error>();

  return (
    <>
      <Modal show={showSlots} onHide={() => setShowSlots(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ADMIN_DASHBOARD_SLOTS_MODAL_TITLE}</Modal.Title>
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
            <StatefulLabeledInput
              value={slotName}
              setValue={setSlotName}
              name={"slotName"}
              label={"Numele fantei"}
              type={"text"}
              className={"mb-3"}
            />
            <Button
              disabled={slotName.length === 0}
              onClick={() => {
                addSlot(slotName, updateId)
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
              }
            }>
              {ADMIN_DASHBOARD_SLOTS_MODAL_ADD_BUTTON}
            </Button>
          </div>
          <div>
            <div className={"d-flex justify-content-between align-items-center mb-3"}>
              <h4>{ADMIN_DASHBOARD_EXISTING_SLOTS}</h4>
              <Button
                variant={"secondary"}
                style={{borderRadius: "50%", aspectRatio: "1/1"}}
                onClick={() => {
                  getDevices()
                    .then(devices => {
                      devices.forEach(device =>
                        device.slots.sort((a, b) => a.id - b.id)
                      );
                      setDevices(devices);
                    });
                }}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
            </div>
            <ol className={"d-flex flex-column gap-2"}>
              {devices.find((device) => device.id === updateId)?.slots.map((slot, index) => (
                <li key={index}>
                  <div className={"d-flex flex-row justify-content-between align-items-center"}>
                    <p>Fanta {slot.name} - Volum: {slot.volume}</p>
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
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowSlots(false)}>
            {ADMIN_DASHBOARD_SLOTS_MODAL_CLOSE_BUTTON}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_TITLE}</Modal.Title>
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
            label={ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_NAME}
            value={updateName}
            setValue={setUpdateName}
            className="mb-3"
          />
          <StatefulLabeledInput
            type="text"
            name="location"
            label={ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_LOCATION}
            value={updateLocation}
            setValue={setUpdateLocation}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            if (updateName.length === 0 && updateLocation.length === 0) {
              setCreateError(new Error(ERROR_UNCOMPLETED_FIELDS));
              return;
            }

            updateDevice(updateId, updateName, updateLocation)
              .then(() => window.location.reload())
              .catch(setUpdateError);
          }}>
            {ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_CONFIRM_BUTTON}
          </Button>
          <Button variant="danger" onClick={() => setShowUpdate(false)}>
            {ADMIN_DASHBOARD_UPDATE_DEVICE_MODAL_CLOSE_BUTTON}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => {
            deleteDevice(updateId)
              .then(() => window.location.reload());
          }}>
            {ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_CONFIRM_BUTTON}
          </Button>
          <Button variant="danger" onClick={() => setShowDelete(false)}>
            {ADMIN_DASHBOARD_DELETE_DEVICE_MODAL_CLOSE_BUTTON}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ADMIN_DASHBOARD_ADD_DEVICE_MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={"text-center mb-3"}>{ADMIN_DASHBOARD_ADD_DEVICE_MODAL_SUBTITLE}</p>
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

      <List title={ADMIN_DASHBOARD_DEVICE_LIST_TITLE}>
        <div className={style.controlButtons}>
          <Button
            data-toggle="tooltip"
            data-placement="top"
            title={ADMIN_DASHBOARD_DEVICE_LIST_ADD_PLACEHOLDER}
            className={style.controlButton}
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus-circle"></i>
          </Button>
          <Button
            variant={"secondary"}
            className={"ms-auto"}
            style={{borderRadius: "50%", aspectRatio: "1/1"}}
            onClick={() => {
              getDevices().then(setDevices);
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </div>
        {(devices.length === 0) && (
          <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
            <h1 className={"my-auto mx-auto text-center"}>Nu exisă niciun dispozitiv</h1>
          </div>
        )}
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
