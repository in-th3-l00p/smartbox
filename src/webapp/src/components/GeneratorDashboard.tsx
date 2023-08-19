import React, {useState} from "react";
import {Device, User} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getDevices} from "../api/device";
import {getUsers} from "../api/admin";
import {Col, Container, Row} from "react-bootstrap";
import ReportList from "./ReportList";

const GeneratorDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, _] = useQuery(async () => {
    const devices: Device[] = await getDevices();
    devices.forEach(device =>
      device.slots.sort((a, b) => a.id - b.id)
    );
    setDevices(devices);
    setUsers(await getUsers());
  });

  return (
    <Container>
      <Row>
        <Col><ReportList users={users} devices={devices} /></Col>
      </Row>
    </Container>
  );
}

export default GeneratorDashboard;
