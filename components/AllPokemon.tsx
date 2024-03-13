import React from "react";

interface PokemonResponse {
    name: string;
    url: string;
}

const AllPokemon = async () => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon?limit=151`);
    const data = await res.json();

    return (
        <aside>
            {data.results.map((poke: PokemonResponse) => (
                <p key={poke.name}>
                    <a href={`/${poke.name}`}>{poke.name}</a>
                </p>
            ))}
        </aside>
    );
};

export default AllPokemon;
