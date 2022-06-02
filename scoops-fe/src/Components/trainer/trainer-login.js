import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

export default function TrainerLogin() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();
    const url = "https://pokeproject.azurewebsites.net";

    async function login() {
        // Whenever you are getting a useRefs value, make sure it's inside some function call. Otherwise it will
        // error due to the refInput.current = undefined, meaning there is no .value available
        const trainer = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
        };

        if (trainer.password === "hello") {
            alert("You need to reset password");
        } else {
            try {
                const response = await axios.post(`${url}/auth`, trainer);
                console.log(response.data);
                console.log("Hey this is the user prior ", user);
                setUser({ ...user, email: trainer.email });
                console.log("This is after we set the user ", user);
                // the below code, manipulates the DOM
                // window.location.replace("http://localhost:3000/dashboard");
                navigate("/dashboard");
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
        }
    }

    return (
        <>
            <h4>Welcome back, please log in below.</h4>
            <input placeholder="Enter Email" ref={emailInput}></input>
            <input type="password" placeholder="Enter password" ref={passwordInput}></input>
            <button onClick={login}>Login</button>
        </>
    );
}
