import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function AccountPage() {
    const scoopInput = useRef();
    const flavorInput = useRef();
    const cardInput = useRef();
    const updateFirstName = useRef();
    const updateLastName = useRef();
    const updatePassword = useRef();
    const [user, setUser] = useContext(userContext);
    console.log(user);
    const [menuBody, setMenuBody] = useState([]);
    const [menu, setMenu] = useState(true);
    const url = "http://localhost:8080/scoops";

    const [creditCardBody, setCreditCardBody] = useState([]);
    const [creditCard, setCreditCard] = useState(true);

    useEffect(() => {
        findAllCards();
    }, [creditCard]);

    const [orderBody, setOrderBody] = useState([]);
    const [order, setOrder] = useState(true);

    useEffect(() => {
        findAllOrders();
    }, [order]);


    const navigate = useNavigate();

    async function registerOrder() {
        // Whenever you are getting a useRefs value, make sure it's inside some function call. Otherwise it will
        // error due to the refInput.current = undefined, meaning there is no .value available
        const totalCost = scoopInput.current.value*3
        const order = {
            menu_item: flavorInput.current.value,
            scoopNum: scoopInput.current.value,
            totalCost: totalCost,
            order_date: "06/05/2022",
            customer_username: user.username,
        };
        console.log(`${url}/creditcards?id=${cardInput.current.value}`)
        const response1 = await fetch(`${url}/creditcards?id=${cardInput.current.value}`);
        const card = await response1.json();

        card.limit = card.limit-order.totalCost
        if (card.limit <= 0){
            console.alert("YOU DONT HAVE THE MONEY!")
        }else{
                console.log(user);
                try {
                    const response3 = await axios.put(`${url}/creditcards`, card);
                    const response = await axios.post(`${url}/orders`, order);
                    console.log(response.data);
                } catch (error) {
                    console.error(error.response.data);
                    alert(error.response.data);
                }
                window.location.reload(false);
            }
        }

    async function findAllCards() {
        
        try {
            const response = await fetch(`${url}/creditcards`);
            const creditCards = await response.json();
            console.log(creditCards);

            const creditCardTableRows = creditCards.map((e) => {
                if (e.customer_username===user.username){
                    return (
                        <tr>
                            <td>{e.cc_number}</td>
                            <td>{e.limit}</td>
                     </tr>
                 );
                    }
                });
            

            setCreditCardBody(creditCardTableRows);
            console.log(creditCards);
        } catch (e) {
            console.error(e);
        }
    }

    async function findAllOrders() {
        
        try {
            console.log((`${url}/orders`))
            const response = await fetch(`${url}/orders`);
            const orders = await response.json();
            console.log(orders);

            const orderTableRows = orders.map((e) => {
                if (e.customer_username===user.username){
                    return (
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.menu_item}</td>
                            <td>{e.scoopNum}</td>
                            <td>{e.totalCost}</td>
                            <td>{e.order_date}</td>
                     </tr>
                 );
                    }
                });
            

            setOrderBody(orderTableRows);
            console.log(orders);
        } catch (e) {
            console.error(e);
        }
    }
    async function updateAccount(){
        const customerUpdated = {
            username: user.username,
            fName: updateFirstName.current.value,
            lName: updateLastName.current.value,
            password: updatePassword.current.value,
            balance: 0,
            isAdmin: 0
        }

            try {
                const response = await axios.put(`${url}/customers`, customerUpdated);
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
            window.location.reload(false);
        }
    

    return (
        <>
            <h1>Welcome Back to Scoops!!!!!</h1>
                <div>
                <input placeholder="How Many Scoops?" ref={scoopInput}></input>
                <input placeholder="What Flavor?" ref={flavorInput}></input>
                <input placeholder="What Card #?" ref={cardInput}></input>

                    <button onClick={registerOrder}>Buy Some Ice Cream</button><br />
                </div>

    
            <table>
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>{creditCardBody}</tbody>
            </table>
            <h2>Order History</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Scoops</th>
                        <th>Total cost</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>{orderBody}</tbody>
            </table>
            <h3>Update/Change Account Info</h3>
                <div>
                <input placeholder="First Name" ref={updateFirstName}></input>
                <input placeholder="Last Name" ref={updateLastName}></input>
                <input placeholder="Password" ref={updatePassword}></input>

                    <button onClick={updateAccount}>Buy Some Ice Cream</button><br />
                </div>

        </>


    );
}