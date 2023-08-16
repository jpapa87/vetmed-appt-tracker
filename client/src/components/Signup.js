import { useHistory } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";


function SignUp({updateVet}){
    const history = useHistory()
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name."),
        password: yup.string().required("Please enter a password."),
        email: yup.string().email(),
    });

    const formik = useFormik({
        initialValues: {
            name:'',
            password:'',
            email:'',
        },

    validationSchema: formSchema,
    onSubmit: (values) => {
        console.log(values)
        fetch('/vets', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(values),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((vet) => {updateVet(vet);
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
        <h1> SignUp Here!</h1>
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
            <label>Email</label>
            <input 
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            <input type="submit" value="SignUp" />
        </form>
    </>
)
}

export default SignUp;