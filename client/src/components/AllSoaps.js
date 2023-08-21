// import React from "react";
import SoapsCard from "./SoapsCard"

function AllSoaps({soaps}) {
    const eachsoaps = soaps.map((soap)=> {
    return(
        <SoapsCard
        key={soap.id}
        ailment= {soap.ailment}
        body= {soap.body}
        created_at={soap.created_at}
        vet_id={soap.vet_id}
        patient_id={soap.patient_id}
        />
    )
    })

    return (
    <div id="soaps">
        {eachsoaps}
    </div>
    );
}

export default AllSoaps;
