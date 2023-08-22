// import React from "react";
import PatientsCard from "./PatientsCard"
import Button from "react-bootstrap/esm/Button"

function AllPatients({patients, deletePatient, id}) {
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

    function handleDelete() {
        deletePatient(id)
    }

    return (
    <div id="patients">
        {eachPatients}
        {/* <button className="del-btn" onClick={handleDelete}>Delete Soap</button> */}
        <Button type= "submit" variant= "outline-success">Delete a patient</Button>

    </div>
    );
}

export default AllPatients;
