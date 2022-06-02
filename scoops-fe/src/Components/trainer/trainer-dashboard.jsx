import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";

export default function TrainerDashboard() {
    const [user, setUser] = useContext(userContext);
    console.log(user);

    const navigate = useNavigate();

    return (
        <>
            <h1>Welcome to your dashboard!!!!!</h1>
            <Link to="/pokemon">
                <button>View Pokemon Here</button>
            </Link>
            <button onClick={() => navigate("/update")}>Update Account</button>
        </>
    );
}
