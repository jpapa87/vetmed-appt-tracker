
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./Signup";
import Homepage from "./Homepage";
import HeaderNavBar from "./HeaderNavBar"
import NewPatientForm from "./NewPatientForm"
import NewSoapForm from "./NewPatientForm"
import AllPatients from "./AllPatients"
import PatientDetail from "./PatientDetail"
import Login from "./Login";

function App() {
  const [vet , setVet] = useState (null)

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = () => {
    fetch('/authorized').then((resp) => {
      if (resp.ok) {
        resp.json().then((vet) => setVet(vet));
      }
    });
  };
  const updateVet = (vet) => setVet(vet);

  return (
  
    <div className="App">
      <h1>VetNotes</h1>
      <HeaderNavBar />
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
            <NewPatientForm />
          </Route>
          <Route path= '/new_soap_form'> 
            <NewSoapForm />
          </Route>
          <Route path='/all_patients'>
            <AllPatients />
          </Route>
          <Route path="/all_patients/:id">
            <PatientDetail />
          </Route>
        </Switch>
    </div>
    
  );
}

export default App;
