import React, {useEffect, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import {DeviceCoordinate} from "../utils/dtos";
import {getDeviceCoordinates} from "../api/device";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 44.4268,
  lng: 26.1025
};

const DeviceMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBSNzTLTr1vs-qSkBSMvS5mjjudvP026ms"
  })

  const [devices, setDevices] = useState<DeviceCoordinate[]>([]);
  useEffect(() => {
    setInterval(() => {
      getDeviceCoordinates().then(setDevices);
    }, 1000);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {devices.map((device, index) => {
        if (device.latitude !== null && device.longitude !== null) {
          return (
            <Marker
              key={index}
              position={{lat: device.latitude, lng: device.longitude}}
              label={{
                text: device.name,
                color: "black",
                className: "pb-5",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            />
          );
        }
      })}
    </GoogleMap>
  ) : <></>
}

export default React.memo(DeviceMap)
