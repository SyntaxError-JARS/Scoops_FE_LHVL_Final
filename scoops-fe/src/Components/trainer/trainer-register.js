import axios from "axios";
import { useRef } from "react";

export default function TrainerRegister() {
    // const user = {
    //     fname: "Tester",
    //     lname: "McTesterson",
    //     email: "tm@mail.com",
    //     password: "test",
    //     dob: "12-31-0000",
    // };

    const url = "https://pokeproject.azurewebsites.net";
    // const url = "http://localhost:8080/poke_project";

    const fnameInput = useRef();
    const lnameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const dobInput = useRef();

    // async-await
    async function register() {
        // Whenever you are getting a useRefs value, make sure it's inside some function call. Otherwise it will
        // error due to the refInput.current = undefined, meaning there is no .value available
        const user = {
            fname: fnameInput.current.value,
            lname: lnameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            dob: dobInput.current.value,
        };
        try {
            const response = await axios.post(`${url}/trainers`, user);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.data);
        }
    }

    return (
        <>
            <h4>Hello, new trainer please register below.</h4>
            <input placeholder="Enter First Name" ref={fnameInput}></input>
            <input placeholder="Enter Last Name" ref={lnameInput}></input>
            <input placeholder="Enter Your Date of Birth" ref={dobInput}></input>
            <br></br>
            <br></br>
            <br></br>
            <input placeholder="Enter Your Email" ref={emailInput}></input>
            <input type="password" placeholder="Enter Your Password" ref={passwordInput}></input>
            <br></br>
            <button onClick={register}>Sign Up</button>
        </>
    );
}
