import {useState} from "react";
import { useHistory } from "react-router-dom";
// Not currently needed, stretch goal:


function SignUp({setUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [errorMessage , setErrorMessage] = useState ("")
    

    let history = useHistory()

    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handleAgeChange(e) {
        setAge(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
            email: email,
            age: age
        }
        console.log(newUser)
        fetch('/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        // TODO Fix everything here with .then(1st) and .then(2nd)
        // FIXME Mainly the issue is that the user is currently just console logged and errors are not handled
        .then(r => {
            if (r.ok) {
                r.json().then((newUser) => {
                    setUser(newUser)
                    history.push('/')
                })
            }
            else {
                e.preventDefault()
                setErrorMessage("User not created. Username must be 3 characters or more, email must include @, and you must be 18 or older to sign up.")
            }
        })
        e.target.reset()
    }

    
    return (
        <>
            <form 
                onSubmit={handleSubmit}
            >
                <h2>Create A New User</h2>
                <input className="create-username"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Create Username"
                    onChange={handleUsernameChange}
                />
                <input className="create-password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Create Password"
                    onChange={handlePasswordChange}
                />
                <input className="enter-email"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={handleEmailChange}
                />
                <input className="enter-age"
                    type="text"
                    name="age"
                    value={age}
                    placeholder="Enter Age"
                    onChange={handleAgeChange}
                />
                <input className="create-new-user"
                    type="submit"
                    name="submit"
                    value="Create New User"
                />
            </form>
            <div>
                {errorMessage}
            </div>
        </>
    )
}

export default SignUp;