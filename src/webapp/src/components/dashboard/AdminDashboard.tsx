import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import AdminUserList from "../AdminUserList";
import AdminDeviceList from "../AdminDeviceList";
import {Device, User} from "../../utils/dtos";
import useQuery from "../../hooks/useQuery";
import {getDevices} from "../../api/device";
import LoadingSpinner from "../LoadingSpinner";
import AdminTransactionList from "../AdminTransactionList";
import AdminDeviceLogList from "../AdminDeviceLogList";
import ReportList from "../ReportList";
import {getUsers} from "../../api/admin";

const AdminDashboard = () => {
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

  if (loading)
    return <LoadingSpinner />
  return (
    <Container>
        <Row>
            <Col>
                <AdminUserList
                  users={users}
                  setUsers={setUsers}
                  devices={devices}
                />
            </Col>
            <Col>
                <AdminDeviceList
                  devices={devices}
                  setDevices={setDevices}
                />
            </Col>
        </Row>
        <Row>
          <Col>
            <AdminTransactionList />
          </Col>
          <Col>
            <AdminDeviceLogList />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReportList users={users} devices={devices} />
          </Col>
        </Row>
    </Container>
  );
}

export default AdminDashboard;
