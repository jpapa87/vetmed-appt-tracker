import {useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function NewPatientForm({addNewPatient}) {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [species, setSpecies] = useState('')
    const history = useHistory()

    function handleNameChange(e) {
        setName(e.target.value)   
    }

    function handleAgeChange(e) {
        setAge(e.target.value)
    }

    function handleSpeciesChange(e) {
        setSpecies(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const NewPatientForm = {
            name: name,
            age: age,
            species: species,
        }
        fetch('/patients', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(NewPatientForm)
        })
            .then(r => r.json())
            .then(NewPatientForm => addNewPatient(NewPatientForm))
            e.target.reset()
            history.push('/patients')
    }

    return(
        <div className="text-center"> 
            <h1> Create a new patient! </h1>
            <form className='d-flex justify-content-center' onSubmit={handleSubmit}>
                <label className="name">Name:
                        <input
                        type="text"
                        name="name"
                        onChange={handleNameChange}
                    />
                </label>
                <br />
                <label className="age">Age:
                    <input 
                        type="text"
                        name="age"
                        onChange={handleAgeChange}
                    />
                </label>
                <br />
                <label className="species">Species/Breed:
                    <input 
                        type="text"
                        name="species"
                        onChange={handleSpeciesChange}
                    />
                </label>
                <br />
                <input className="create-new"
                    type="submit"
                    name="submit"
                    value="Create New "
                />
            </form>
        </div>
    )
}

export default NewPatientForm;
