import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { UserContext } from "../context/user";
import { useContext } from "react";


function SoapsCard({deleteSoap , soap }) {
    const [beingEdited, setBeingEdited ] = useState (false)
    const {user, setUser} = useContext(UserContext)
    const {id , ailment, created_at, patient_id , body , vet_id} = soap
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
    <div className="soaps-card" >
        <h4>Ailment: {ailment}</h4>
        <h4>Vet: {soap.vet.name}</h4>
        <h4>Patient: {soap.patient.name}</h4>
        <h4>Created At: {created_at}</h4>
        { beingEdited ? editForm : <h4>Assesment: {newBody}</h4> } 
        { user.id === soap.vet_id ?
        <Button type= "submit" onClick={() => deleteSoap(id)} variant= "outline-success">Delete a SOAP</Button> : null}
        { user.id === soap.vet_id ?
        <Button type= "submit"  onClick={() => setBeingEdited(true)} variant= "outline-success">Edit this SOAP</Button> : null}
    </div>
    
    );
}

export default SoapsCard;
