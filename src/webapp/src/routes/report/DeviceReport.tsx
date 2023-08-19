import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {DeviceReport} from "../../utils/dtos";
import useQuery from "../../hooks/useQuery";
import {getDeviceReport} from "../../api/reports";
import LoadingSpinner from "../../components/LoadingSpinner";
import {Button, Table} from "react-bootstrap";
import TextContainer from "../../components/TextContainer";
import {utils, writeFile} from "xlsx";

const DeviceReport = () => {
  const params = useParams();
  const [report, setReport] = useState<DeviceReport>();
  const [loading, error] = useQuery(async () => {
    // @ts-ignore
    const id = Number.parseInt(params.id);
    setReport(await getDeviceReport(id));
  });

  if (loading)
    return <LoadingSpinner />
  return (
    <TextContainer title={"Raport pubelă"}>
      <Table striped bordered hover size={"lg"} className={"mt-3"} responsive={"sm"}>
        <thead>
        <tr>
          <th>ID Pubelă</th>
          <th>Adresă</th>
          {report?.slots.map((slot, index) =>
            <th key={index}>Slot {slot.name}</th>)
          }
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{report?.deviceId}</td>
          <td>{report?.deviceLocation}</td>
          {report?.slots.map((slot, index) =>
            <td key={index}>{slot.volume}</td>)
          }
        </tr>
        </tbody>
      </Table>
      <Button className={"me-3"} onClick={() => {
        const object: any = {
          "ID Pubelă": report?.deviceId,
          "Adresă": report?.deviceLocation
        }
        report?.slots.forEach((slot, index) => {
          object[`Slot ${slot.name}`] = slot.volume;
        });
        const ws = utils.json_to_sheet([object]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Raport pubelă");
        writeFile(wb, "raport_pubela.xlsx");
      }}>
        Exportă
      </Button>
      <Button variant={"danger"} onClick={() => {
        window.location.href = "/?scroll=reports";
      }}>Înapoi</Button>
    </TextContainer>
  );
}

export default DeviceReport;
