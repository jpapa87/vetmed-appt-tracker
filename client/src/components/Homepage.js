import React from "react";

function Homepage(){
    return (
        <div className="container-lg">
            <div className="about-title">
                <h1>Welcome To VetNotes!</h1>
            </div>
            <div className=" border text-center"> 
                <p>Welcome to the Veterinary Clinic Management System! This application is designed to streamline the management of patient records and SOAP (Subjective, Objective, Assessment, Plan) notes for veterinarians.</p>
            </div>
            <div className="border text-center"> 
                <img className="img-fluid m-0" src= "../assets/potato.jpg" alt= "Background" id="home-page-img"/>
            </div>
        </div>
    )
}

export default Homepage;
