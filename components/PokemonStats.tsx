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
        <div className="gap-y-3 gap-x-2 w-full grid grid-cols-[auto,_1fr] ">
            {pokemon.stats.map((stat) => (
                <React.Fragment key={stat.stat.name}>
                    <h2 className="text-right font-bold">{stat.stat.name}: </h2>
                    <div className="bg-neutral-200 w-full rounded-md">
                        <div
                            style={{
                                backgroundColor:
                                    types[pokemon.types[0].type.name].bg,
                                width: `${
                                    (stat.base_stat / highestValue) * 100
                                }%`,
                            }}
                            className="py-0.5 px-3 text-end rounded-md text-white"
                        >
                            <span className="font-bold">{stat.base_stat}</span>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default PokemonStats;
