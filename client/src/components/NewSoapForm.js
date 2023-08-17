import {useState} from "react";


function NewSoapForm({addNewSoap}) {
    const [name, setName] = useState('')
    const [aliment, setAilment] = useState('')
    const [body, setBody] = useState('')

    function handleNameChange(e) {
        setName(e.target.value)   
    }

    function handleAilmentChange(e) {
        setAilment(e.target.value)
    }

    function handleBodyChange(e) {
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
            <form onSubmit={handleSubmit}>
                <label className="name">Name:
                    <input
                        type="text"
                        name="name"
                        onChange={handleNameChange}
                    />
                </label>
                <br />
                <label className="ailment">Ailment
                    <input 
                        type="text"
                        name="ailment"
                        onChange={handleAilmentChange}
                    />
                </label>
                <br />
                <label className="body">Body:
                    <input 
                        type="text"
                        name="body"
                        onChange={handleBodyChange}
                    />
                </label>
                <br />
                <input className="create-new"
                    type="submit"
                    name="submit"
                    value="Create New Soap"
                />
            </form>
        </div>
    )
}

export default NewSoapForm;
