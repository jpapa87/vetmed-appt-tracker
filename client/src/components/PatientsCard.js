import { useState } from "react";


function PatientsCard({name, age, species}) {
    return (
    <div className="card" style={{width: "18rem"}}>
        <img src="https://static.vecteezy.com/system/resources/previews/008/479/821/original/creative-illustration-of-a-veterinary-clinic-logo-vector.jpg" className="card-img-top" alt="..."/>
        <h4>Name: {name}</h4>
        <h4>Age: {age}</h4>
        <h4>Species: {species}</h4>
        
    </div>
    );
}

export default PatientsCard;
