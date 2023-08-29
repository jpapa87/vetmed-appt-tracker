import { useHistory } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext , useState } from "react";

function SignUp(){
    const {setUser} = useContext (UserContext)
    const [error, setError] = useState ("")
    const history = useHistory()
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name."),
        password: yup.string().required("Please enter a password."),
        // email: yup.string().email(),
    });
    const formik = useFormik({
        initialValues: {
            name:'',
            password:'',
            email:'',
            specialty:'',
        },

    validationSchema: formSchema,
    onSubmit: (values) => {
        // console.log("hello")
        fetch('/vets', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(values),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((vet) => {setUser(vet);
                    history.push('/');
                    })
                } else {
                    r.json().then((errorMessage)=> setError(errorMessage.errors))
                }
            })
        },
    })
    // console.log(formik.errors)

    return (
    <>
        <h1 className="text-center"> SignUp Here!</h1>
        <br></br>
        <h5 className="text-center" id="signup-info">Whether you're a seasoned veterinarian or just starting your practice, this system will assist you in efficiently handling patient information and providing top-notch care.</h5>
        <br></br>
        <form className="text-center" onSubmit= {formik.handleSubmit}>
            <label>Username</label>
            <input 
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
            />
            <label>Email</label>
            <input 
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            <label>Specialty</label>
            <input 
                type="text"
                name="specialty"
                value={formik.values.specialty}
                onChange={formik.handleChange}
            />
            <input type="submit" value="SignUp" variant="outline" /> 
            {error ? <div>{error}</div> : null }
            <img className="img-fluid m-0" src= "../assets/drbrodsky.jpeg" alt= "Background" id="new-pt-img"/>
        </form>
    </>
)
}

export default SignUp;