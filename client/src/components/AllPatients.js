// import React from "react";
import PatientsCard from "./PatientsCard"

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
    <div id="patients">
        {eachPatients}
    </div>
    );
}

export default AllPatients;
