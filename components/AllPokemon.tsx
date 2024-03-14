import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React from "react";

const AllPokemon = async () => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon?limit=151`);
    const data = await res.json();

    const pokemonInfoPromises = data.results.map(
        async (result: PokeAPI.Pokemon) => {
            const response = await fetch(`${baseUrl}pokemon/${result.name}`);
            const pokemonInfo = await response.json();
            return pokemonInfo;
        }
    );

    const pokemonInfoArray = await Promise.all(pokemonInfoPromises).catch(
        (error) => console.error("Error fetching Pokemon data:", error)
    );

    if (!pokemonInfoArray) return;

    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))] justify-items-center content-center">
            {pokemonInfoArray.map((poke: PokeAPI.Pokemon) => (
                <a href={`/${poke.name}`} key={poke.id}>
                    <Image
                        src={poke.sprites.front_default}
                        alt={poke.name}
                        height={96}
                        width={96}
                    />
                </a>
            ))}
        </div>
    );
};

export default AllPokemon;
