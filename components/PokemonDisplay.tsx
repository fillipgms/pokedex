import PokeAPI, { Pokemon, ChainLink } from "pokedex-promise-v2";
import React from "react";
import Image from "next/image";

const PokemonDisplay = async (pokemon: PokeAPI.Pokemon | ChainLink) => {
    if (typeof pokemon === "object" && "id" in pokemon) {
        const poke = pokemon as Pokemon;
        return (
            <a
                href={`/${poke.name}`}
                key={poke.id}
                className="bg-white/25 rounded-md"
            >
                <Image
                    src={poke.sprites.front_default}
                    alt={poke.name}
                    height={95}
                    width={95}
                />
            </a>
        );
    } else {
        const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.species.name}`
        );
        const res = (await data.json()) as PokeAPI.Pokemon;

        return (
            <a
                href={`/${res.name}`}
                key={res.id}
                className="bg-white/25 rounded-md"
            >
                <Image
                    src={res.sprites.front_default}
                    alt={res.name}
                    height={95}
                    width={95}
                />
            </a>
        );
    }
};

export default PokemonDisplay;
