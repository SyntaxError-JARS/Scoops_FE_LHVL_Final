import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function CustomerLogin() {
    const usernameInput = useRef();
    const passwordInput = useRef();
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();
    const url = "http://localhost:8080/scoops"


    async function login() {
        // Whenever you are getting a useRefs value, make sure it's inside some function call. Otherwise it will
        // error due to the refInput.current = undefined, meaning there is no .value available
        const customer = {
            username: usernameInput.current.value,
            password: passwordInput.current.value,
        };

        if (customer.password === "admin") {
            navigate("/adminpage");
        } else {
            try {
                console.log(customer)
                const response = await axios.post(`${url}/auth`, customer);
                console.log(response.data);
                console.log("Hey this is the user prior ", user);
                setUser({ ...user, username: customer.username });
                console.log("This is after we set the user ", user);
                navigate("/accountpage");
            } catch (error) {
                console.log("We got problems")
                console.error(error.response.data);
                alert(error.response.data);
            }
        }
    }

    return (
        <>
            <h4>Welcome back, please log in below.</h4>
            <input placeholder="Enter Username" ref={usernameInput}></input>
            <input type="password" placeholder="Enter password" ref={passwordInput}></input>
            <button onClick={login}>Login</button>
        </>
    );
}