import { useState } from "react";
import Button from "react-bootstrap/esm/Button";


function SoapsCard({ ailment, body, created_at, vet_id, patient_id, id, deleteSoap}) {
    const [beingEdited, setBeingEdited ] = useState (false)
    const [newBody , setNewBody] = useState (body)

    const editForm = (
        <form onSubmit={handleSubmit}className="new-soap-form">
            <textarea  
                onChange= {handleBody}
                placeholder="Notes about the patient here..." value= {newBody} rows={10} 
            />
            <Button type= "submit" variant= "outline-success">Submit</Button>
        </form>
    )
        function handleSubmit(e){
            e.preventDefault()
            fetch(`/soaps/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({body : newBody})
            })
            .then((r) => r.json())
            .then(newSoap => console.log(newSoap))
            setBeingEdited(false)
        }
        


        function handleBody(e){
            setNewBody(e.target.value)
        }


    return (
    <div className="card" style={{width: "18rem"}}>
        <h4>Ailment: {ailment}</h4>
        <h4>Vet ID: {vet_id}</h4>
        <h4>Patient ID: {patient_id}</h4>
        <h4>Created At: {created_at}</h4>
        { beingEdited ? editForm : <h4>Assesment: {newBody}</h4> }
        <Button type= "submit" onClick={() => deleteSoap(id)} variant= "outline-success">Delete a SOAP</Button>
        <Button type= "submit"  onClick={() => setBeingEdited(true)} variant= "outline-success">Edit this SOAP</Button>
    </div>
    
    );
}

export default SoapsCard;
