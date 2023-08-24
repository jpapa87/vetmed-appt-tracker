import {useState, useEffect} from "react";
import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { UserContext } from "../context/user";

function NewSoapForm({addNewSoap, patients}) {
    const [patientId, setPatientId] = useState("")
    const [createdAt, setCreatedAt] = useState('')
    const [ailment, setAilment] = useState('')
    const [body, setBody] = useState('')
    const history = useHistory()
    const {user} = useContext(UserContext)

    // console.log(patients)

    useEffect(() => {
        if (patients[0]) {
            setPatientId(patients[0].id)
        }
    } , [patients])

    function handleCreatedAt(e) {
        setCreatedAt(e.target.value)   
    }

    function handleAilment(e) {
        setAilment(e.target.value)
    }

    function handleBody(e) {
        setBody(e.target.value)
    }

    function handlePatientId(e){
        setPatientId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const NewSoapForm = {
            created_at: createdAt,
            ailment: ailment,
            body: body,
            vet_id: user.id,
            patient_id: patientId
        }
        fetch('/soaps', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(NewSoapForm)
        })
            .then(r => r.json())
            .then(NewSoapForm => addNewSoap(NewSoapForm))
            e.target.reset()
            history.push('/soaps')
    }

    return(
        <div>
            <h1>Create a new SOAP!</h1>
        <form  className="card align-items"onSubmit={handleSubmit}>
            <select onChange={handlePatientId} defaultValue={patients[0]?.id}>
                {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}</select>            
            <input 
                onChange={handleCreatedAt}placeholder="Date: MM/DD/YY" />
            <input 
                onChange= {handleAilment}placeholder="Ailment" />
            <textarea
                onChange= {handleBody}
                placeholder="Notes about the patient here..." rows={10} 
            />
            {/* <input type="submit" value="Submit" /> */}
            <Button type= "submit" variant= "outline-success">Submit</Button>
        </form>
        </div>
    )
}

export default NewSoapForm;
