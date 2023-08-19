import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {UserDeviceReport} from "../../utils/dtos";
import useQuery from "../../hooks/useQuery";
import {getUserDeviceReport} from "../../api/reports";
import LoadingSpinner from "../../components/LoadingSpinner";
import TextContainer from "../../components/TextContainer";
import {Button, Table} from "react-bootstrap";
import {utils, writeFile} from "xlsx";

const UserDeviceReport = () => {
  const params = useParams();
  const [report, setReport] = useState<UserDeviceReport>();
  const [loading, error] = useQuery(async () => {
    // @ts-ignore
    const id = Number.parseInt(params.id);
    setReport(await getUserDeviceReport(id));
  });

  if (loading)
    return <LoadingSpinner />
  return (
    <TextContainer title={"Raport referitor la utilizatorii unei pubele"}>
      <Table striped bordered hover size={"lg"} className={"mt-3"} responsive={"sm"}>
        <thead>
          <tr>
            <th>ID pubelă</th>
            <th>ID user</th>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Email</th>
            <th>Adresă</th>
            <th>Nr. contract</th>
            <th>ID Card</th>
          </tr>
        </thead>
        <tbody>
          {report?.users.map((user, index) => (
            <tr key={index}>
              <td>{report?.deviceId}</td>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{report?.id}</td>
              <td>{user.cardId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className={"me-3"} onClick={() => {
        // @ts-ignore
        const object: any[] = report?.users.map(user => ({
          "ID pubelă": report?.deviceId,
          "ID user": user.userId,
          "Nume": user.firstName,
          "Prenume": user.lastName,
          "Email": user.email,
          "Adresă": user.address,
          "Nr. contract": report?.id,
          "ID Card": user.cardId
        }));
        const wb = utils.book_new();
        const ws = utils.json_to_sheet(object);
        utils.book_append_sheet(wb, ws, "Raport utilizatori pubelă");
        writeFile(wb, "raport-utilizatori-pubelă.xlsx");
      }}>
        Exportă
      </Button>

      <Button variant={"danger"} onClick={() => {
        window.location.href = "/?scroll=reports";
      }}>Înapoi</Button>
    </TextContainer>
  );
}

export default UserDeviceReport;
