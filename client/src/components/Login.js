import { useHistory } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";
import { useState } from "react";


function Login({fetchSoaps}){
    const {setUser} = useContext (UserContext)
    const [errors , setErrors] = useState([])
    const history = useHistory()
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name."),
        password: yup.string().required("Please enter a password."),
    });

    const formik = useFormik({
        initialValues: {
            name:'',
            password:'',
        },

    validationSchema: formSchema,
    onSubmit: (values) => {
        console.log(values)
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(values),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((vet) => {setUser(vet)
                        fetchSoaps()
                        history.push('/')
                    })
                }
                else {
                    r.json().then((errorMessage) => setErrors(errorMessage.errors))
                }
            })
        },
    })
    // console.log(formik.values.name)
    return (
    <>
        <h1 className="text-center"> Login Here! </h1>
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
            <input type="submit" value="Sign in " />
            {errors.length > 0
            ? errors.map((errorMessage)=> (
                <div key= {errorMessage}>
                    {errorMessage }
                </div>
            )) : null}
        </form>
        <img className="img-fluid m-10" src= "../assets/marissa.jpeg" alt= "Background" id="login-img"/>
    </>
)
}
export default Login;