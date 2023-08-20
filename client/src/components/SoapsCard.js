import { useState } from "react";


function SoapsCard({ ailment, body, created_at, vet_id, patient_id}) {
    return (
    <div className="card" style={{width: "18rem"}}>
        <h4>Ailment: {ailment}</h4>
        <h4>Vet ID: {vet_id}</h4>
        <h4>Patient ID: {patient_id}</h4>
        <h4>Created At: {created_at}</h4>
        <h4>Assesment: {body}</h4>
    </div>
    );
}

export default SoapsCard;
