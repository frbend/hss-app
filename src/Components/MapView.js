import React, { useState, useMemo } from "react";
import { GoogleMap, InfoWindowF, useLoadScript, MarkerF, MarkerClusterer } from "@react-google-maps/api";
import  importData  from '../Data/Data.json';


export default function Home() {
  //Load Script for Google Maps, if Map is not loaded returns "Loading..."
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
    // const [isToggled, setIsToggled] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

      //Returns flag color based on state of the flag, onClick prints flag state in console
    const getFlagColor = (result) =>{
        if(result === true){
          return <span onClick={() =>switchFlagColor(result)} className="square-green"></span>
        }if(result === false)
        return <span onClick={() =>switchFlagColor(result)} className="square-red"></span>
      }

      // const toggle = useCallback(
      //   () => setIsToggled(!isToggled),
      //   [isToggled, setIsToggled],
      //   console.log(isToggled)
      // );

      //Unfinished switching of flag color, currently only logs flag state
      const switchFlagColor = (result) =>{

        console.log(result)
      };

      //Returns siren colors based on status of the siren
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

    //Options for MarkerClusterer, required
    const options = {
      gridSize: 20,
      minimumClusterSize: 2,
      imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    }

    //Calculator for MarkerClusterer and options such as text on cluster
    const calculator = function (markers, numStyles) {
      var index = 0;
      var count = markers.length;

      var dv = count;
      while (dv !== 0) {
        dv = parseInt(dv / 5, 5);
        index++;
      }
    
      index = Math.min(index, numStyles);
      return {
        text: count,
        index: index,
        title: count
      };
    };
    
    //Google maps data - returns GoogleMap, MarkerClusterer, Markers based on location and
    //InfoWindow for each marker
    //MarkerClusterer does not work properly with this API, if changed to GoogleMarkerClusterer (incl. import)
    //clustering then works only until page is refreshed or switched to Devices then all markers dissapear
    const googleMapsData = 
        <GoogleMap 
            zoom={8} center={center} 
            mapContainerClassName="map-container" 
            onClick={() => setActiveMarker(null)}>
            {item.map((items) =>{
              return (
                  <div key={items.$id} className="devices-data-container">
                    <MarkerClusterer
                        options={options}
                        maxZoom={10}
                        calculator={calculator}
                        >{(clusterer) =>
                          (items.regionDeviceList.$values.map((subItems) => (
                            <MarkerF
                                icon={{url:(require('../Img/Siren.png'))}}
                                key={subItems.dId}
                                address = {subItems.address}
                                position={{lat: subItems.location.y,lng: subItems.location.x}}
                                name={subItems.name}
                                image={subItems.image}
                                onClick={() => handleActiveMarker(subItems.dId)}
                                clusterer={clusterer}
                                >{activeMarker === subItems.dId ? (
                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                        <div className="info-window">
                                            <p className="siren-heading-top">{subItems.name}</p>
                                            <p>Location: </p>
                                            <p className="info-window-address">{subItems.address}</p>
                                            <p>Insert location</p>
                                            <p>Status <br/>{getStatusColor(subItems.status)}</p>
                                            <img src={`${subItems.image}`} alt="" width="250px" height="130px"></img>
                                            <p className="siren-heading-bottom">Siren status</p>
                                            <div className="flag-container">
                                                <p>{getFlagColor(subItems.Flag1)} Flag 1</p>
                                                <p>{getFlagColor(subItems.Flag2)} Flag 2</p>
                                                <p>{getFlagColor(subItems.Flag3)} Flag 3</p>
                                                <p>{getFlagColor(subItems.Flag4)} Flag 4</p>
                                                <p>{getFlagColor(subItems.Flag5)} Flag 5</p>
                                            </div>
                                            <div className="infotime-voltage-container">
                                                <p>Info time</p>
                                                <p>Voltage</p>
                                                <p>{subItems.infotime}</p>
                                                <p>{subItems.voltage}</p>
                                            </div>
                                            <div className="button-container">
                                                <button className="save">Save</button>
                                                <button className="cancel">Cancel</button>
                                            </div>
                                        </div>
                                    </InfoWindowF>
                                ) : null}
                            </MarkerF>
                          )))
                        }
                    </MarkerClusterer>
                  </div>
                );
              })
            }    
        </GoogleMap>

    return (
      <div>
      {googleMapsData}
      </div>
    );
}
