import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import AdminDeviceList from "../AdminDeviceList";
import {Device} from "../../utils/dtos";
import useQuery from "../../hooks/useQuery";
import {getDevices} from "../../api/device";
import LoadingSpinner from "../LoadingSpinner";
import {getUsers} from "../../api/admin";
import OperatorNotificationList from "../OperatorNotificationList";

const OperatorDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, _] = useQuery(async () => {
    const devices: Device[] = await getDevices();
    devices.forEach(device =>
      device.slots.sort((a, b) => a.id - b.id)
    );
    setDevices(devices);
    setUsers(await getUsers());
  });

  if (loading)
    return <LoadingSpinner />
  return (
    <Container>
      <Row>

        <Col>
          <AdminDeviceList
            devices={devices}
            setDevices={setDevices}
          />
        </Col>
        <Col>
          <OperatorNotificationList/>
        </Col>
      </Row>

    </Container>
  );
}

export default OperatorDashboard;
