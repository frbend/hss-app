import React, { useState } from "react";
import  importData  from '../Data/Data.json';


function Devices(){


    const [item] = useState(importData.$values);


    const getFlagColor = (result) =>{
        if(result === true){
          return <span className="square-green"></span>
        }if(result === false)
        return <span className="square-red"></span>
      }
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
            <div key={items.$id} className="devices-data-container">
            <p className="heading">{items.regionName}</p>
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
          );
    })

    const [table, setState] = useState(devicesData)


    return(
        <div>
            <div className="devices-nav">
                <p className="devices-heading">Devices</p>
                <button  className="choose-device">Choose</button>

                <div className="filter-device-options">
                    <button onClick={() => setState(filterActive)}><span className="dot-green"></span>Active</button>
                    <button onClick={() => filterPartial()}><span className="dot-yellow"></span>Partial</button>
                    <button onClick={() => filterFailed()}><span className="dot-red"></span>Off</button>
                    <button>Select all</button>
                </div>

                <div className="devices-nav-right">
                    <button className="add-device">Add new device</button>
                </div>
            </div>
            <div className="devices-container">
            <div className="devices-data-container-heading">
                    <p>Status</p>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Flags</p>
                </div>
                <div className="devices-content">
                    {useState(table)}
                </div>
            </div>
        </div>
    )
}

export default Devices;