import types from "@/data/types";
import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonFamily from "./PokemonFamily";

const PokemonDetails = async (pokemon: PokeAPI.Pokemon) => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const species = await fetch(`${baseUrl}/pokemon-species/${pokemon.name}`);
    const speciesData = (await species.json()) as PokeAPI.PokemonSpecies;

    return (
        <div
            style={{ borderColor: types[pokemon.types[0].type.name].color }}
            className="my-6 bg-zinc-100 w-full shadow-lg  h-5/6 rounded-md"
        >
            <PokemonFamily {...pokemon} />
        </div>
    );
};

export default PokemonDetails;
