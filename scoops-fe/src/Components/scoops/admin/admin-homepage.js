import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function Adminpage() {
    const [user, setUser] = useContext(userContext);
    console.log(user);

    const navigate = useNavigate();

    return (
        <>
            <h1 >Hello Scoops Administor!!!!!</h1>
            <Link to="/admin">
            </Link>
            <button onClick={() => navigate("/adminupdate")}>Update Menu</button>


        </>

    );
}