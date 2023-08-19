import React, {useState} from "react";
import {UserReport} from "../../utils/dtos";
import useQuery from "../../hooks/useQuery";
import {getUserReport} from "../../api/reports";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import TextContainer from "../../components/TextContainer";
import {Button, Table} from "react-bootstrap";
import {utils, writeFile} from "xlsx";

const UserReport = () => {
  const params = useParams();
  const [report, setReport] = useState<UserReport>();
  const [loading, error] = useQuery(async () => {
    // @ts-ignore
    const id = Number.parseInt(params.id);
    setReport(await getUserReport(id));
  });

  if (error !== undefined)
    return <h1 className={"mt-5 pt-5"}>Raportul nu există</h1>
  if (loading)
    return <LoadingSpinner />
  return (
    <TextContainer title={"Raport utilizator"}>
      <Table striped bordered hover size={"lg"} className={"mt-3"} responsive={"sm"}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Email</th>
            <th>Adresă</th>
            <th>Nr. Contract</th>
            <th>ID Pubelă</th>
            <th>ID Card</th>
            {report?.slots.map((slot, index) =>
              <th key={index}>Slot {slot.name}</th>)
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report?.userId}</td>
            <td>{report?.firstName}</td>
            <td>{report?.lastName}</td>
            <td>{report?.email}</td>
            <td>{report?.address}</td>
            <td>{report?.id}</td>
            <td>{report?.deviceId}</td>
            <td>{report?.cardId}</td>
            {report?.slots.map((slot, index) =>
              <td key={index}>{slot.volume}</td>)
            }
          </tr>
        </tbody>
      </Table>

      <Button className={"me-3"} onClick={() => {
        const object: any = {
          "User ID": report?.userId,
          "Prenume": report?.firstName,
          "Nume": report?.lastName,
          "Email": report?.email,
          "Adresă": report?.address,
          "Nr. Contract": report?.id,
          "ID Pubelă": report?.deviceId,
          "ID Card": report?.cardId,
        };
        report?.slots.forEach((slot, index) => {
          object[`Slot ${slot.name}`] = slot.volume;
        });
        const ws = utils.json_to_sheet([object]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Raport utilizator");
        writeFile(wb, "raport-utilizator.xlsx");
      }}>
        Exportă
      </Button>

      <Button variant={"danger"} onClick={() => {
        window.location.href = "/?scroll=reports";
      }}>Înapoi</Button>
    </TextContainer>
  );
}

export default UserReport;
