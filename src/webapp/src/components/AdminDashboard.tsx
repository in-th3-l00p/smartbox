import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import AdminUserList from "./AdminUserList";
import AdminDeviceList from "./AdminDeviceList";
import {Device} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getDevices} from "../api/device";
import LoadingSpinner from "./LoadingSpinner";

const AdminDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, _] = useQuery(async () => {
    setDevices(await getDevices());
  });

  if (loading)
    return <LoadingSpinner />
  return (
    <Container>
        <Row lg={2}>
            <Col>
                <AdminUserList devices={devices} />
            </Col>
            <Col>
                <AdminDeviceList
                  devices={devices}
                  setDevices={setDevices}
                />
            </Col>
        </Row>
    </Container>
  );
}

export default AdminDashboard;
