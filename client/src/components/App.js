
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./Signup";
import Homepage from "./Homepage";
import NavBar from "./NavBar"
import NewPatientForm from "./NewPatientForm"
import NewSoapForm from "./NewSoapForm"
import AllPatients from "./AllPatients"
import Login from "./Login";
import { UserContext } from "../context/user";
import AllSoaps from "./AllSoaps";

function App() {
  // const [vet , setVet] = useState (null)
  const [patients , setPatients] = useState ([])
  const [soaps , setSoaps] = useState ([])
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetchUser();
    fetchPatients();
    fetchSoaps();
  }, [])

  const fetchUser = () => {
    fetch('/authorized').then((resp) => {
      if (resp.ok) {
        resp.json().then((vet) => setUser(vet));
      }
    });
  };
  // const updateVet = (vet) => setVet(vet);

  const fetchPatients = () => {
    fetch("/patients")
    .then(r => r.json())
    .then(patientsData => setPatients(patientsData))
  }
  
  function addNewPatient(patient){
    setPatients([...patients , patient])
  }

  const fetchSoaps = () => {
    fetch("/soaps")
    .then(r => r.json())
    .then(soapsData => setSoaps(soapsData))
  }
  
  function addNewSoap(soap){
    setSoaps([...soaps , soap])
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
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/new_patient_form'>
          <NewPatientForm addNewPatient={addNewPatient}/>
        </Route>
        <Route exact path= '/new_soap_form'> 
          <NewSoapForm addNewSoap={addNewSoap}/>
        </Route>
        <Route path='/patients'>
          <AllPatients patients={patients}/>
        </Route>
        <Route path='/soaps'>
          <AllSoaps soaps={soaps}/>
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
