import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function AccountPage() {
    const [user, setUser] = useContext(userContext);
    console.log(user);

    const navigate = useNavigate();

    async function AddCard(){

    }

    async function PaymentHistory() {

    }

    return (
        <>
            <h1>Welcome Back to Scoops!!!!!</h1>
                <div>
                    <button>Place an Order</button><br /><br />
                    <button onClick={AddCard}>View Cards</button>
                </div>
                <div>
                <button onClick={AddCard}>Add a Card</button>
                </div>
                <div>
                <button onClick={PaymentHistory}>View Past Orders</button>
                </div>
        </>

    );
}