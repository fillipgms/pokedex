import PokeAPI from "pokedex-promise-v2";
import React from "react";
import Image from "next/image";

const PokemonDisplay = (pokemon: PokeAPI.Pokemon) => {
    return (
        <a
            href={`/${pokemon.name}`}
            key={pokemon.id}
            className=" bg-white/25 rounded-md"
        >
            <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                height={95}
                width={95}
            />
        </a>
    );
};

export default PokemonDisplay;
