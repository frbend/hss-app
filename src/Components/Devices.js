import React, { useState } from "react";
import  importData  from '../Data/Data.json';


function Devices(){


    const [item] = useState(importData.$values);
    //const [table, setState] = useState(devicesData)


    //Returns flag color based on state of the flag, onClick prints flag state in console
    const getFlagColor = (result) =>{
        if(result === true){
          return <span className="square-green"></span>
        }if(result === false)
        return <span className="square-red"></span>
      }

    //Returns siren status colors based on status of the siren
      const getStatusColor = (status ) =>{
        if(status === 'Normal'){
            return <span className="dot-green"></span>
        }
        if(status === 'Partial'){
            return <span className="dot-yellow"></span>
            }
        else if(status === 'Fail'){
            return <span className="dot-red"></span>
        }
      }


    //Filter sirens with "Normal" status
    const filterActive = () => {
        item.map((items) =>{
           return items.regionDeviceList.$values.filter(subItem => subItem.status === "Normal").map(filteredActiveItem =>(
            <div key={items.dId} className="devices-data-container-content">
            <p>{getStatusColor(items.status)}</p>
            <p>{items.dId}</p>
            <p>{items.name}</p> 
            <div className="devices-flag-container">
                <p>{getFlagColor(items.Flag1)}</p>
                <p>{getFlagColor(items.Flag2)}</p>
                <p>{getFlagColor(items.Flag3)}</p>
                <p>{getFlagColor(items.Flag4)}</p>
                <p>{getFlagColor(items.Flag5)}</p>
            </div>
        </div>&&
           console.log(filteredActiveItem)
            ))
        })
        }     
        
    //Filter sirens with "Partial" status
    const filterPartial = () => {
        item.map((items) =>{
           return items.regionDeviceList.$values.filter(subItem => subItem.status === "Partial").map(filteredPartialItem =>(
                console.log(filteredPartialItem)
            ))
        })
        }  

    //Filter sirens with "Failed" status
    const filterFailed = () => {
        item.map((items) =>{
           return items.regionDeviceList.$values.filter(subItem => subItem.status === "Fail").map(filteredFailedItem =>(
                console.log(filteredFailedItem)
            ))
        })
        }   

    //Mapping over JSON data
    const devicesData = item.map((items) =>{
        return (
        <div key={items.$id}>
                <p className="heading">{items.regionName}</p>
                    <div className="devices-data-container-heading">
                        <p>Status</p>
                        <p>ID</p>
                        <p>Name</p>
                        <p>Flags</p>
                    </div>
            <div className="devices-data-container">
              {items.regionDeviceList.$values.map((subItems) => {
                return (
                    <div key={subItems.dId} className="devices-data-container-content">
                        <p>{getStatusColor(subItems.status)}</p>
                        <p>{subItems.dId}</p>
                        <p>{subItems.name}</p> 
                        <div className="devices-flag-container">
                            <p>{getFlagColor(subItems.Flag1)}</p>
                            <p>{getFlagColor(subItems.Flag2)}</p>
                            <p>{getFlagColor(subItems.Flag3)}</p>
                            <p>{getFlagColor(subItems.Flag4)}</p>
                            <p>{getFlagColor(subItems.Flag5)}</p>
                        </div>
                    </div>
                );
              })}
            </div>
        </div>);
    })



    return(
        <div>
            <div className="devices-nav">
                <p className="devices-heading">Devices</p>

                <div className="filter-device-options">
                    <button onClick={() => filterActive()}><span className="dot-green"></span>Active</button>
                    <button onClick={() => filterPartial()}><span className="dot-yellow"></span>Partial</button>
                    <button onClick={() => filterFailed()}><span className="dot-red"></span>Off</button>
                    <button>Select all</button>
                </div>

                <div className="devices-nav-right">
                    <button className="add-device">Add new device</button>
                </div>
            </div>
            <div className="devices-container">
                <div className="devices-left-side-container">
                    <p className="devices-left-side-container-heading-top">Sirens</p>
                    <div>
                        <p className="number-circle-red">2 </p>
                        <p className="devices-left-side-container-text-red">Off</p>
                    </div>
                    <div>
                        <p className="number-circle-yellow">1 </p>
                        <p className="devices-left-side-container-text-yellow">Partial</p>
                    </div><br/><br/>

                    <p className="devices-left-side-container-heading-bottom">Control Centers</p>
                    <div>
                        <p className="number-circle-grey">1 </p>
                        <p className="devices-left-side-container-text-grey">Off</p>
                    </div>
                </div>

                <div className="devices-content">
                    {devicesData}
                </div>
            </div>
        </div>
    )
}

export default Devices;