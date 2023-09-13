import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import TextContainer from "../components/TextContainer";
import {Device, Slot} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getDevice} from "../api/device";
import LoadingSpinner from "../components/LoadingSpinner";

interface SlotDisplayProps {
  slot: Slot;
}

const SlotDisplay: React.FC<SlotDisplayProps> = ({slot}) => {
  const location = useLocation();
  const params = useParams();

  return (
    <div>
      <div
        style={{
          position: "relative",
          aspectRatio: "1/1",
          maxWidth: "200px"
      }}
      >
        <img src={"/trash.png"} alt={"trash shape"} style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          aspectRatio: "1/1",
        }} />

        <img src={"/trashFilled.png"} alt={"trash shape"} style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          objectFit: "cover",
          objectPosition: "bottom",
          height: slot.volume / 100 * 100 + "%",
        }} />
      </div>
      <h3 className={"text-center"}>{slot.name} - {slot.volume}%</h3>
    </div>
  );
}

const AdminDeviceStatus = () => {
  const params = useParams();
  const [device, setDevice] = useState<Device>();
  const [loading, error] = useQuery(async () => {
    // @ts-ignore
    setDevice(await getDevice(params.id));
  });

  if (loading)
    return <LoadingSpinner />
  if (error)
    return (
      <div className={"mt-5 pt-5 text-center mx-5"}>
        <h1>Dispozitivul nu a fost găsit</h1>
      </div>
    );
  return (
    <TextContainer title={"Status pubelă: " + device?.name}>
      <div className={"d-flex flex-wrap gap-3 mt-3"}>
        {device?.slots.map((slot, index) => (
          <SlotDisplay key={index} slot={slot} />
        ))}
      </div>
    </TextContainer>
  );
}

export default AdminDeviceStatus;
