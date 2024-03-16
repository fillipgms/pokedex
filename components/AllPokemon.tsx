import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";
import generations from "@/data/generations";

interface AllPokemonInfo {
    gen: string | string[];
}

const AllPokemon = async (gen: AllPokemonInfo) => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const parseGen = Array.isArray(gen.gen)
        ? parseInt(gen.gen[0])
        : parseInt(gen.gen as string);

    const res = await fetch(
        `${baseUrl}pokemon?limit=${
            generations[parseGen as keyof typeof generations].count
        }&offset=${generations[parseGen as keyof typeof generations].offset}`
    );
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
        <div className="px-5 md:px-12 grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))] justify-items-center content-center gap-3">
            {pokemonInfoArray.map((poke: PokeAPI.Pokemon) => (
                <PokemonDisplay {...poke} />
            ))}
        </div>
    );
};

export default AllPokemon;
