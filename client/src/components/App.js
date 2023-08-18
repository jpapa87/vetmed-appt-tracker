
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./Signup";
import Homepage from "./Homepage";
import NavBar from "./NavBar"
import NewPatientForm from "./NewPatientForm"
import NewSoapForm from "./NewSoapForm"
import AllPatients from "./AllPatients"
import PatientDetail from "./PatientDetail"
import Login from "./Login";

function App() {
  const [vet , setVet] = useState (null)
  const [patients , setPatients] = useState ([])

  useEffect(() => {
    fetchUser();
    fetchPatients();
  }, [])

  const fetchUser = () => {
    fetch('/authorized').then((resp) => {
      if (resp.ok) {
        resp.json().then((vet) => setVet(vet));
      }
    });
  };
  const updateVet = (vet) => setVet(vet);

  const fetchPatients = () => {
    fetch("/patients")
    .then(r => r.json())
    .then(patientsData => setPatients(patientsData))
  }
  
  function addNewPatient(patient){
    setPatients([...patients , patient])
  }

  return (
  
    <div className="App">
      <h1>VetNotes</h1>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>        
        <Route path='/signup'>
          <SignUp updateVet={updateVet}/>
        </Route>
        <Route path='/login'>
          <Login updateVet={updateVet}/>
        </Route>
        <Route path='/new_patient_form'>
          <NewPatientForm addNewPatient={addNewPatient}/>
        </Route>
        <Route exact path= '/new_soap_form'> 
          <NewSoapForm NewSoapForm={NewSoapForm}/>
        </Route>
        <Route path='/patients'>
          <AllPatients patients={patients}/>
        </Route>
        <Route path="/patients/:id">
          <PatientDetail />
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
