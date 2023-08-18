import { useState } from "react";


function PatientsCard({name, age, species}) {
    return (
    <div>
        <h3>{name}</h3>
        <p>{age}</p>
        <p>
        <strong>{species}</strong>
        </p>
        {/* <button onClick={handleClick}>{click ? "got to party" : "party successful"}</button> */}
    </div>
    );
}

export default PatientsCard;
