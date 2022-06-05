import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../App";

export default function Adminpage() {
    const nameInput = useRef();
    const priceInput = useRef();
    const colorInput = useRef();
    const updateNameInput = useRef();
    const updatePriceInput = useRef();
    const updateColorInput = useRef();
    const removeMenuInput = useRef();
    const [user, setUser] = useContext(userContext);
    const [menuBody, setMenuBody] = useState([]);
    const [menu, setMenu] = useState(true);
    const url = "http://localhost:8080/scoops";

    const navigate = useNavigate();

    async function registerMenu() {
        const menu = {
            item_name: nameInput.current.value,
            cost: priceInput.current.value,
            color: colorInput.current.value,
        }
    
            console.log(menu);
            try {
                const response = await axios.post(`${url}/menus`, menu);
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
            window.location.reload(false);
        }
        async function removeMenu(){
            try {
                const response = await axios.delete(`${url}/menus?id=${removeMenuInput.current.value}`);
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
            window.location.reload(false);
        }

    async function updateMenu() {
        const intVal = parseInt(updatePriceInput.current.value)
        const menuUpdated = {
            item_name: updateNameInput.current.value,
            cost: intVal,
            color: updateColorInput.current.value,
        }
    
            console.log(menuUpdated);
            try {
                const response = await axios.put(`${url}/menus`, menuUpdated);
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data);
            }
            window.location.reload(false);
        }
    

    return (
        <>
            <h3>Add an item to the menu</h3>

            <div>
                <input placeholder="Item Name?" ref={nameInput}></input>
                <input placeholder="Price? Default=3" ref={priceInput}></input>
                <input placeholder="Color?" ref={colorInput}></input>

                    <button onClick={registerMenu}>Register Item</button><br />
                </div>

            <h3>Remove an item from the menu</h3>
            <div>
                <input placeholder="Remove item" ref={removeMenuInput}></input>
                <button onClick={removeMenu}>Remove Item</button><br />
                </div>
            <h3>Update an item on the menu</h3>
            <div>
                <input placeholder="Item Name?" ref={updateNameInput}></input>
                <input placeholder="Price? Default=3" ref={updatePriceInput}></input>
                <input placeholder="Color?" ref={updateColorInput}></input>

                    <button onClick={updateMenu}>Update Item</button><br />
                </div>

        </>

    );
}