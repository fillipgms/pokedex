import React from "react";

import { IoIosArrowBack } from "react-icons/io";
import generations from "@/data/generations";
import PokeAPI from "pokedex-promise-v2";

const PokemonHeader = (pokemon: PokeAPI.Pokemon) => {
    let generation: string | number = 1;
    for (const key in generations) {
        if (Object.prototype.hasOwnProperty.call(generations, key)) {
            const gen = generations[key];
            if (pokemon.id <= gen.offset + gen.count) {
                generation = key;
                break;
            }
        }
    }

    return (
        <header className="py-3 bg-zinc-100 shadow-xl z-[3] fixed w-full md:px-16 flex items-center gap-3 capitalize font-semibold">
            <a href={`/?gen=${generation}`}>
                <IoIosArrowBack />
            </a>
            <span>{pokemon.name}</span>
        </header>
    );
};

export default PokemonHeader;
