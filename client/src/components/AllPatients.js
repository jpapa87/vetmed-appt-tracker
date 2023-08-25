// import React from "react";
import PatientsCard from "./PatientsCard"
import Button from "react-bootstrap/esm/Button"

function AllPatients({patients}) {
    const eachPatients = patients.map((patient)=> {
    return(
        <PatientsCard
        key={patient.id}
        name= {patient.name}
        age= {patient.age}
        species= {patient.species}
        />
    )
    })

    

    return (
    <div id="patients-container">
        {eachPatients}
        {/* <button className="del-btn" onClick={handleDelete}>Delete Soap</button> */}
        {/* <Button type= "submit" variant= "outline-success">Delete a patient</Button> */}

    </div>
    );
}

export default AllPatients;
