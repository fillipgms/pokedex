import types from "@/data/types";
import PokeAPI from "pokedex-promise-v2";
import React from "react";

const PokemonStats = async (pokemon: PokeAPI.Pokemon) => {
    let highestValue = pokemon.stats[0].base_stat;
    for (let i = 1; i < pokemon.stats.length; i++) {
        if (pokemon.stats[i].base_stat > highestValue) {
            highestValue = pokemon.stats[i].base_stat;
        }
    }

    return (
        <div className="flex flex-col gap-3 w-full justify-center">
            {pokemon.stats.map((stat) => (
                <div
                    className="flex capitalize gap-3 text-right items-center font-bold"
                    key={stat.stat.name}
                >
                    <h2 className="flex-1">{stat.stat.name}: </h2>
                    <div className="bg-neutral-200 flex-1 w-full rounded-md overflow-hidden">
                        <div
                            style={{
                                backgroundColor:
                                    types[pokemon.types[0].type.name].bg,
                                width: `${
                                    (stat.base_stat / highestValue) * 100
                                }%`,
                            }}
                            className="h-full py-0.5 px-3 text-end text-white"
                        >
                            <span className="shadow-2xl">{stat.base_stat}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PokemonStats;
