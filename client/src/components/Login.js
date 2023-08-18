import { useHistory } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import { UserContext } from "../context/user";
import { useContext } from "react";


function Login(){
    const {setUser} = useContext (UserContext)
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
                    r.json().then((vet) => {setUser(vet);
                    history.push('/');
                    })
                } else {
                    console.log("Bunny Fitch")
                }
            })
        },
    })
    // console.log(formik.values.name)
    return (
    <>
        <h1> Login Here! </h1>
        <form onSubmit= {formik.handleSubmit}>
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
        </form>
    </>
)
}
export default Login;