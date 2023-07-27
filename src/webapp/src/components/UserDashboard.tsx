import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Col, Container, Row} from "react-bootstrap";
import UserCardStatus from "./UserCardStatus";
import UserTransactionList from "./UserTransactionList";

const UserDashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col><UserCardStatus /></Col>
        <Col><UserTransactionList /></Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
