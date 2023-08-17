import React from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NavBar({user, setUser}) {
    let history = useHistory()

    const handleClick = () => {
        fetch("/logout", {
        method: "DELETE",
        }).then(() => {
            setUser(null);
        });
    };

    // function handleChange(e) {
    //     const selection = e.target.value
    //     console.log(selection)
    //     if (selection === 'login') {
    //         history.push('/new_soap_form')
    //     }else if (selection === 'home'){
    //         history.push('/')
    //     }else if (selection === 'add-patient') {
    //         history.push('/new_patient_form')
    //     }
    // }
    return(
        <ul className="nav">
            <li classname="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/new_soap_form">New Soap Form</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/new_patient_form">New Patient Form</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
            </li> */}
        </ul>
    )
//     return (
//     <nav>
//         <div className="nav-tabs">            
//             <select className="nav-tabs-content" onChange={handleChange}>
//                 <option value="home">Home</option>
//                 <option value="new-patient">New Patient Form</option>
//                 <option value="new-soap">New Soap Form</option>
//             </select> 
//         </div>
//         {user ?
//         <div className='nav-bar-links'>
//         <h3 id='nav-user-name'>Welcome, {user.username}</h3>
//         <NavLink to='/' className="nav-links" onClick={handleClick}>Log Out</NavLink>
//         </div>
//         :<div className='nav-bar-links'>
//             <NavLink exact to="/login" className="nav-links">Login</NavLink>
//             <NavLink to='/signup' className="nav-links">Sign Up</NavLink>
//         </div>
//         }
//     </nav>
//     );
}

export default NavBar;