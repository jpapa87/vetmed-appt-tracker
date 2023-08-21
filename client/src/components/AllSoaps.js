// import React from "react";
import Button from "react-bootstrap/esm/Button";
import SoapsCard from "./SoapsCard"

function AllSoaps({soaps, deleteSoap}) {
    const eachsoaps = soaps.map((soap)=> {
    return(
        <SoapsCard
        key={soap.id}
        ailment= {soap.ailment}
        body= {soap.body}
        created_at={soap.created_at}
        vet_id={soap.vet_id}
        patient_id={soap.patient_id}
        id = {soap.id}
        deleteSoap = {deleteSoap}
        />
    )
    })
    // function handleDelete(e) {
    //     deleteSoap(id)
    // }

    return (
    <div id="soaps">
        {eachsoaps}
        {/* <button className="del-btn" onClick={handleDelete}>Delete Soap</button> */}
    </div>
    );
}

export default AllSoaps;
