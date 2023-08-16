
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/Signup";
import Home from "./components/Homepage";

function App() {
  return (
  
    <div className="App">
      <h1>Welcome to VetMed Appointment Tracker!</h1>
      <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>        
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/new_patient_form'>
            <NewPatientForm />
          </Route>
          <Route path= '/new_soap_form'> 
            <NewSoapForm />
          </Route>
          <Route path='/all_patients'>
            <Patients />
          </Route>
          <Route path="/all_patients/:id">
            <PatientDetail />
          </Route>
        </Switch>
    </div>
    
  );
}

export default App;
