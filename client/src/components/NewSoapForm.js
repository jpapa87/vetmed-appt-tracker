import {useState} from "react";
import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function NewSoapForm({addNewSoap}) {
    const [name, setName] = useState('')
    const [aliment, setAilment] = useState('')
    const [body, setBody] = useState('')

    function handleName(e) {
        setName(e.target.value)   
    }

    function handleAilment(e) {
        setAilment(e.target.value)
    }

    function handleBody(e) {
        setBody(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const NewSoapForm = {
            name: name,
            aliment: aliment,
            body: body,
        }
        fetch('/new_soap_form', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(NewSoapForm)
        })
            .then(r => r.json())
            .then(NewSoapForm => addNewSoap(NewSoapForm))
            e.target.reset()
    }

    return(
        <div>
            <h1>SOAP</h1>
        <form onSubmit={handleSubmit}className="new-soap-form">
            <input onChange={handleName}placeholder="name" />
            <input onChange= {handleAilment}placeholder="ailment" />
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
