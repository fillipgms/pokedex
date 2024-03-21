import types from "@/data/types";
import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonFamily from "./PokemonFamily";

const PokemonDetails = async (pokemon: PokeAPI.Pokemon) => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const species = await fetch(
        `${baseUrl}/pokemon-species/${pokemon.name
            .split("-")[0]
            .replace("-", "")}`
    );
    const speciesData = (await species.json()) as PokeAPI.PokemonSpecies;

    let lastEnglishFlavorText;
    for (let i = speciesData.flavor_text_entries.length - 1; i >= 0; i--) {
        const flavorTextEntry = speciesData.flavor_text_entries[i];
        if (flavorTextEntry.language.name === "en") {
            lastEnglishFlavorText = flavorTextEntry.flavor_text;
            break;
        }
    }

    return (
        <div
            style={{ borderColor: types[pokemon.types[0].type.name].color }}
            className="my-6 bg-zinc-100 w-full md:max-w-xl shadow-lg rounded-md py-2 px-5"
        >
            <p>{lastEnglishFlavorText}</p>
        </div>
    );
};

export default PokemonDetails;
