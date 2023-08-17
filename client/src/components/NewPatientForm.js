import {useState} from "react";


function NewPatientForm({addNewPatient}) {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [species, setSpecies] = useState('')

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
        fetch('/new_patient_form', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(NewPatientForm)
        })
            .then(r => r.json())
            .then(NewPatientForm => addNewPatient(NewPatientForm))
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
                <label className="age">age
                    <input 
                        type="text"
                        name="age"
                        onChange={handleAgeChange}
                    />
                </label>
                <br />
                <label className="species">Species:
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
                    value="Create New Patient"
                />
            </form>
        </div>
    )
}

export default NewPatientForm;
