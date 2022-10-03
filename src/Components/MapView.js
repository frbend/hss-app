import React, { useState } from "react";
import { useMemo } from "react";
import { GoogleMap, InfoWindowF ,useLoadScript, MarkerF } from "@react-google-maps/api";
import  importData  from '../Data/Data.json';


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBZGmD2snfDxTBUjFjphUiA-bPNz8WokQc',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
    const [activeMarker, setActiveMarker] = useState(null);
    const center = useMemo(() => ({ lat: 56, lng: 12 }), []);
    const [item] = useState(importData.$values);
    //toggling of the flags in state
    // const [isToggled, setIsToggled] = useState(false);


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

    const getFlagColor = (result) =>{
        if(result === true){
          return <a href="#" onClick={() =>switchFlagColor(result)} id="green"><span className="square-green"></span></a>
        }if(result === false)
        return <a href="#" onClick={() =>switchFlagColor(result)} id="red"><span className="square-red"></span></a>
      }

      // const toggle = useCallback(
      //   () => setIsToggled(!isToggled),
      //   [isToggled, setIsToggled],
      //   console.log(isToggled)
      // );

      const switchFlagColor = (result) =>{
        if(result === true){
          return console.log(result)
        }
        else console.log(result)
      };

    const getStatusColor = (status ) =>{
      if(status === 'Normal'){
          return <span className="dot-green"></span>
      }
      if(status === 'Partial'){
          return <span className="dot-yellow"></span>
          }
      else{
          return <span className="dot-red"></span>
      }
    }

    //TODO: - Clustering on the map
    //      - Toggle flags from infoWindow and save it in JSON -> Need backend???
    //      - Devices page - buttons + filter results -- DONE (In CONSOLE ONLY)
    // TODO: Fix mapping on MapView and Devices if there's time??


  return (
    <GoogleMap 
        zoom={8} center={center} 
        mapContainerClassName="map-container" 
        onClick={() => setActiveMarker(null)}
        >
      {/* <MarkerClusterer>
          {clusterer =>
          positions.map(position=>{ */}

        {item[0].regionDeviceList.$values.map((
            {dId, address, location, name, image, status, 
            Flag1, Flag2, Flag3, Flag4, Flag5,
            infotime, voltage}) =>(
            <MarkerF
                    // clusterer={clusterer}
                    icon={{url:(require('../Img/Siren.png'))}}
                    key={dId}
                    address = {address}
                    position={{lat: location.y,lng: location.x}}
                    name={name}
                    image={image}
                    onClick={() => handleActiveMarker(dId)}
                    >
                {activeMarker === dId ? (

                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div className="info-window">
                    <p className="heading">{name}</p>
                    <p>Location: </p>
                    <p className="info-window-address">{address}</p>
                    <p>Insert location</p>
                    <p>Status {getStatusColor(status)}</p>
                    <img src={`${image}`} alt="" width="250px" height="130px"></img>
                    <p className="heading">Siren status</p>
                    <div className="flag-container">
                        <p>{getFlagColor(Flag1)} Flag 1</p>
                        <p>{getFlagColor(Flag2)} Flag 2</p>
                        <p>{getFlagColor(Flag3)} Flag 3</p>
                        <p>{getFlagColor(Flag4)} Flag 4</p>
                        <p>{getFlagColor(Flag5)} Flag 5</p>
                    </div>
                    <div className="infotime-voltage-container">
                        <p>Info time</p>
                        <p>Voltage</p>
                        <p>{infotime}</p>
                        <p>{voltage}</p>
                    </div>
                    <div className="button-container">
                        <button className="save">Save</button>
                        <button className="cancel">Cancel</button>
                    </div>
                </div>
                </InfoWindowF>
            ) : null}
            </MarkerF>
        ))}
      {/* })
                }</MarkerClusterer> */}
          {importData.$values[1].regionDeviceList.$values.map((
          {dId, address, location, name, image, status,
           Flag1, Flag2, Flag3, Flag4, Flag5,
          infotime, voltage}) =>(
            <MarkerF
            // clusterer={clusterer}
            icon={{url:(require('../Img/Siren.png'))}}
            key={dId}
            address = {address}
            position={{lat: location.y,lng: location.x}}
            name={name}
            image={image}
            onClick={() => handleActiveMarker(dId)}
            >
        {activeMarker === dId ? (

        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
        <div className="info-window">
            <p className="heading">{name}</p>
            <p>Location: </p>
            <p className="info-window-address">{address}</p>
            <p>Insert location</p>
            <p>Status {getStatusColor(status)}</p>
            <img src={`${image}`} alt="" width="250px" height="130px"></img>
            <p className="heading">Siren status</p>
                <div className="flag-container">
                    <p>{getFlagColor(Flag1)} Flag 1</p>
                    <p>{getFlagColor(Flag2)} Flag 2</p>
                    <p>{getFlagColor(Flag3)} Flag 3</p>
                    <p>{getFlagColor(Flag4)} Flag 4</p>
                    <p>{getFlagColor(Flag5)} Flag 5</p>
                </div>
                <div className="infotime-voltage-container">
                    <p>Info time</p>
                    <p>Voltage</p>
                    <p>{infotime}</p>
                    <p>{voltage}</p>
                  </div>
                  <div className="button-container">
                      <button className="save">Save</button>
                      <button className="cancel">Cancel</button>
                  </div>
            </div>
            </InfoWindowF>
            ) : null}
        </MarkerF>
        ))}
    </GoogleMap>
  );
}
