import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Menu() {
    const [menuBody, setMenuBody] = useState([]);
    const [menu, setMenu] = useState(true);
    const url = "http://localhost:8080/scoops";

    useEffect(() => {
        findAll();
    }, [menu]);

    // Async/Await in JS, this came around in 2016 (ECMAScript6)
    async function findAll() {
        try {
            console.log((`${url}/menus`))
            const response = await fetch(`${url}/menus`);
            const menus = await response.json();
            console.log(menus);

            const menuTableRows = menus.map((e) => {
                return (
                    <tr>
                        <td>{e.item_name}</td>
                        <td>{e.cost}</td>
                        <td>{e.color}</td>
                    </tr>
                );
            });

            setMenuBody(menuTableRows);
            console.log(menus);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Menu Item</th>
                        <th>Cost</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>{menuBody}</tbody>
            </table>
        </>
    );
}