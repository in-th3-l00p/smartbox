import React, {useEffect, useRef, useState} from "react";
import List from "./List";
import {Alert, Button, Form, Tab, Tabs} from "react-bootstrap";
import dstyle from "../styles/Dashboard.module.scss";
import {Device, DeviceReport, User, UserDeviceReport, UserReport} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {
  createDeviceReport,
  createUserDeviceReport,
  createUserReport,
  getDeviceReports,
  getUserDeviceReports,
  getUserReports
} from "../api/reports";
import {useLocation} from "react-router-dom";

const ReportDisplay: React.FC<{
  date: Date;
  href: string
}> = ({ date, href }) => {
  return (
    <div className={dstyle.element} onClick={() => window.location.href = href}>
      <div className={dstyle.principalInfo}>
        <h4>{date.toUTCString()}</h4>
      </div>
    </div>
  );
}

const ReportList: React.FC<{
  users: User[],
  devices: Device[]
}> = ({ users, devices }) => {
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [deviceReports, setDeviceReports] = useState<DeviceReport[]>([]);
  const [userDeviceReports, setUserDeviceReports] = useState<UserDeviceReport[]>([]);
  const [_loading, _error] = useQuery(async () => {
    setUserReports((await getUserReports()).reverse());
    setDeviceReports((await getDeviceReports()).reverse());
    setUserDeviceReports((await getUserDeviceReports()).reverse());
  });
  const [error, setError] = useState<Error>();

  const [reportType, setReportType] = useState<string>("user");
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);

  const location = useLocation();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.has("scroll") && query.get("scroll") === "reports") {
      reportRef.current?.scrollIntoView();
    }
  }, [])

  const onCreate = () => {
    getUserReports()
      .then(reports => setUserReports(reports.reverse()));
    getDeviceReports()
      .then(reports => setDeviceReports(reports.reverse()));
    getUserDeviceReports()
      .then(reports => setUserDeviceReports(reports.reverse()));
    setCreateSuccess(true);
  }

  return (
    <div ref={reportRef}>
      <List title={"Rapoarte"} className={"w-100"}>
        <Tabs justify>
          <Tab
            title={"Utilizatori"}
            eventKey={"users"}
          >
            {userReports.map((report, index) => (
              <ReportDisplay
                key={index}
                date={report.createdAt}
                href={`/reports/users/${report.id}`}
              />
            ))}
          </Tab>
          <Tab
            title={"Pubele"}
            eventKey={"devices"}
          >
            {deviceReports.map((report, index) => (
              <ReportDisplay
                key={index}
                date={report.createdAt}
                href={`/reports/devices/${report.id}`}
              />
            ))}
          </Tab>
          <Tab
            title={"Utilizatorii unei pubele"}
            eventKey={"userDevices"}
          >
            {userDeviceReports.map((report, index) => (
              <ReportDisplay
                key={index}
                date={report.createdAt}
                href={`/reports/userDevices/${report.id}`}
              />
            ))}
          </Tab>
          <Tab
            title={"Crează raport"}
            eventKey={"create"}
            className={"p-3"}
          >
            {createSuccess && (
              <Alert
                variant={"success"}
                onClick={() => setCreateSuccess(false)}
                dismissible
              >
                Raportul a fost creat cu succes!
              </Alert>
            )}
            {error && (
              <Alert
                variant={"danger"}
                onClick={() => setError(undefined)}
                dismissible
              >
                {error.message}
              </Alert>
            )}
            <Form.Group className={"mb-3"}>
              <Form.Label>Tip raport</Form.Label>
              <Form.Select onChange={(e) => setReportType(e.target.value)}>
                <option value={"user"}>Utilizatori</option>
                <option value={"device"}>Pubele</option>
                <option value={"userDevice"}>Utilizatorii unei pubele</option>
              </Form.Select>
            </Form.Group>

            {reportType === "user" ? (
              <Form.Group className={"mb-3"}>
                <Form.Label>Utilizator</Form.Label>
                <Form.Select onChange={(e) => setSelectedUser(users[parseInt(e.target.value)])}>
                  {users.map((user, index) => (
                    <option key={index} value={index}>{user.login}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className={"mb-3"}>
                <Form.Label>Dispozitiv</Form.Label>
                <Form.Select onChange={(e) => setSelectedDevice(devices[parseInt(e.target.value)])}>
                  {devices.map((device, index) => (
                    <option key={index} value={index}>{device.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Button
              disabled={
                (reportType === "user" && selectedUser === undefined) ||
                (reportType === "device" && selectedDevice === undefined) ||
                (reportType === "userDevice" && selectedDevice === undefined)
              }
              onClick={() => {
                if (reportType === "user") {
                  createUserReport(selectedUser.id)
                    .then(onCreate)
                    .catch((err) => setError(err));
                } else if (reportType === "device") {
                  createDeviceReport(selectedDevice.id)
                    .then(onCreate)
                    .catch((err) => setError(err));
                } else {
                  createUserDeviceReport(selectedDevice.id)
                    .then(onCreate)
                    .catch((err) => setError(err));
                }
              }}
            >
              Creează
            </Button>
          </Tab>
        </Tabs>
      </List>
    </div>
  )
}

export default ReportList;
