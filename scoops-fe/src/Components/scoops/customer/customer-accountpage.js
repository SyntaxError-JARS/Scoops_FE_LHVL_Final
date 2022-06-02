import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function AccountPage() {
    const [user, setUser] = useContext(userContext);
    console.log(user);

    const navigate = useNavigate();

    return (
        <>
            <h1>Welcome Back to Scoops!!!!!</h1>
            <Link to="/order">
                <button>Place an Order</button>
            </Link>
            <button onClick={() => navigate("/update")}>Update Account</button>

            <button onClick={() => navigate("/history")}>View Past Orders</button>
        </>

    );
}