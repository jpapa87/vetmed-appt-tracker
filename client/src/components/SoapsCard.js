import { useState } from "react";
import Button from "react-bootstrap/esm/Button";


function SoapsCard({ ailment, body, created_at, vet_id, patient_id, id, deleteSoap}) {
    const [beingEdited, setBeingEdited ] = useState (false)
    const [newBody , setNewBody] = useState (body)

    const editForm = (
        <form onSubmit={handleSubmit}>
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
        // <div className="card" >
        //     <div className="card-body">
        //         <h5 className="card-title">Ailment: {ailment}</h5>
        //         <h6 className="card-subtitle mb-2 text-body-secondary">Vet ID: {vet_id}</h6>
        //         <h6 className="card-subtitle mb-2 text-body-secondary">Patient ID: {patient_id}</h6>
        //         <h6 className="card-subtitle mb-2 text-body-secondary"> Created At: {created_at}</h6>
        //             { beingEdited ? editForm : <h6> Assesment: {newBody} </h6>}
        //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //         <Button type= "submit" onClick={() => deleteSoap(id)} variant= "outline-success">Delete a SOAP</Button>
        //         <Button type= "submit"  onClick={() => setBeingEdited(true)} variant= "outline-success">Edit this SOAP</Button>
        //     </div>
        // </div>



    // <section id="topics">
    // style={{width: "18rem"}}
        <div className="soaps-card" >
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
