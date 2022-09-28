import React  from "react";
import  importData  from '../Data/Data.json';


function Devices(){

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




    const devicesDataValuesAarhus = importData.$values[0].regionDeviceList.$values.map(deviceValueAarhus =>
        <div key={deviceValueAarhus.dId} className="devices-data-container">
            <div className="devices-data-container-content">
                <p>{getStatusColor(deviceValueAarhus.status)}</p>
                <p>{deviceValueAarhus.dId}</p>
                <p>{deviceValueAarhus.name}</p>
                <div className="devices-flag-container">
                    <p>{getFlagColor(deviceValueAarhus.Flag1)}</p>
                    <p>{getFlagColor(deviceValueAarhus.Flag2)}</p>
                    <p>{getFlagColor(deviceValueAarhus.Flag3)}</p>
                    <p>{getFlagColor(deviceValueAarhus.Flag4)}</p>
                    <p>{getFlagColor(deviceValueAarhus.Flag5)}</p>
                </div>
            </div>
        </div>
        )

    const devicesDataValuesKbh = importData.$values[1].regionDeviceList.$values.map(deviceValueKbh =>
        <div key={deviceValueKbh.dId} className="devices-data-container">
            <div className="devices-data-container-content">
            <p>{getStatusColor(deviceValueKbh.status)}</p>
            <p>{deviceValueKbh.dId}</p>
            <p>{deviceValueKbh.name}</p>
            <div className="devices-flag-container">
                <p>{getFlagColor(deviceValueKbh.Flag1)}</p>
                <p>{getFlagColor(deviceValueKbh.Flag2)}</p>
                <p>{getFlagColor(deviceValueKbh.Flag3)}</p>
                <p>{getFlagColor(deviceValueKbh.Flag4)}</p>
                <p>{getFlagColor(deviceValueKbh.Flag5)}</p>
            </div>
        </div>
    </div>
    )

    return(
        <div>
            <div className="devices-nav">
                    <p className="devices-heading">Devices</p>
                    <button  className="choose-device">Choose</button>
                    <button  className="filter-device">Filter</button>
                        <div className="filter-device-options">
                            <button><span className="dot-green"></span>Active</button>
                            <button><span className="dot-yellow"></span>Partial</button>
                            <button><span className="dot-red"></span>Off</button>
                            <button>Select all</button>
                        </div>

                        <div className="devices-nav-right">
                            <button className="add-device">Add new device</button>
                        </div>
            </div>
            <div className="devices-container">
                <div className="devices-content">
                    <p className="heading">{importData.$values[0].regionName}</p>
                        <div className="devices-data-container-heading">
                            <p>Status</p>
                            <p>ID</p>
                            <p>Name</p>
                            <p>Flags</p>
                        </div>
                            {devicesDataValuesAarhus}
                    <p className="heading">{importData.$values[1].regionName}</p>
                        <div className="devices-data-container-heading">
                            <p>Status</p>
                            <p>ID</p>
                            <p>Name</p>
                            <p>Flags</p>
                        </div>
                            {devicesDataValuesKbh}
                </div>
            </div>
        </div>
    )
}

export default Devices;