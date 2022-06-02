import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import PokemonCreate from "./pokemon-create";

export default function PokemonWelcome() {
    const [pokemonBody, setPokemonBody] = useState([]);
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(true);
    const url = "https://pokeproject.azurewebsites.net";

    useEffect(() => {
        findAll();
    }, [pokemon]);

    // Async/Await in JS, this came around in 2016 (ECMAScript6)
    async function findAll() {
        try {
            const response = await fetch(`${url}/pokemon`);
            const pokemons = await response.json();
            const pokemonTableRows = pokemons.map((e) => {
                return (
                    <tr>
                        <td>{e.pokemonName}</td>
                        <td>{e.hp}</td>
                    </tr>
                );
            });

            setPokemonBody(pokemonTableRows);
            console.log(pokemons);
        } catch (e) {
            console.error(e);
        }
    }

    const pokemonHard = {
        pokemonName: "MaxwellHouse",
        hp: 10,
        atk: 1,
        elementType: 1,
        ability1: "Tackle",
        ability2: "Vine Whip",
    };

    async function createPokemon() {
        try {
            await axios.post(`${url}/pokemon`, pokemonHard);
            if (pokemon === true) {
                setPokemon(false);
            } else {
                setPokemon(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {user.email === "Guest" ? <button onClick={() => navigate("/login")}>Login to Create Pokemon</button> : <PokemonCreate />}
            {user.email === "Guest" || <button onClick={createPokemon}>Create Pokemon</button>}
            <table>
                <thead>
                    <tr>
                        <th>Pokemon Name</th>
                        <th>HP</th>
                    </tr>
                </thead>
                <tbody>{pokemonBody}</tbody>
            </table>
        </>
    );
}
