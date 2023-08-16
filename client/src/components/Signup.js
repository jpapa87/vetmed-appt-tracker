import {useState} from "react";
import { useHistory } from "react-router-dom";
// Not currently needed, stretch goal:


    function SignUp(){
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        
        function handleSubmit(e) {
            e.preventDefault()
            const newUser = {
                username: username,
                email: email,
                password: password
            }
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
                <input className="enter-email"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={handleEmailChange}
                />
                <input className="create-password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Create Password"
                    onChange={handlePasswordChange}
                />
                <input className="create-new-user"
                    type="submit"
                    name="submit"
                    value="Create New User"
                />
            </form>
            {/* <div>
                {errorMessage}
            </div> */}
        </>
    )
}

export default SignUp;