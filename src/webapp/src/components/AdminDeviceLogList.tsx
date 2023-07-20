import React, {useEffect, useState} from "react";
import List from "./List";
import {DeviceLog} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import style from "../styles/Dashboard.module.scss";
import {getAllDeviceLogs} from "../api/deviceLog";

const DeviceLogDisplay: React.FC<{deviceLog: DeviceLog}> = ({ deviceLog }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className={style.element}>
      <div
        className={style.principalInfo}
        onClick={() => setOpened(!opened)}
      >
        <h4>{deviceLog.log}</h4>
        <p className={"ms-auto"}>{
          deviceLog
            .createdDate
            .replace("Z", " ")
            .replace("T", " ")}
        </p>
      </div>
      {opened && (
        <div className={style.details}>
          <div>
            <p>ID dispozitiv: {deviceLog.device.id}</p>
            <p>Nume dispozitiv: {deviceLog.device.name}</p>
            <p>Locație dispozitiv: {deviceLog.device.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const AdminDeviceLogList = () => {
  const [logs, setLogs] = useState<DeviceLog[]>([]);
  const [loading, _] = useQuery(async () => {
    setLogs(await getAllDeviceLogs());
  });

  useEffect(() => {
    setInterval(() => {
      getAllDeviceLogs()
        .then(setLogs);
    }, 1000)
  }, [])

  return (
    <List title={"Mesaje dispozitiv"}>
      {logs.map(transaction => (
        <DeviceLogDisplay
          key={transaction.id}
          deviceLog={transaction}
        />
      ))}
    </List>
  );
}

export default AdminDeviceLogList;
