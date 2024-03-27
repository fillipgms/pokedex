import React from "react";
import PokeAPI from "pokedex-promise-v2";
import types from "@/data/types";

const PokemonDetails = async (pokemon: PokeAPI.Pokemon) => {
    return (
        <div className="space-y-3 ">
            <div className="flex gap-3">
                <h2 className="font-bold">ID:</h2>
                <span>#{pokemon.id}</span>
            </div>
            <div className="flex gap-3">
                <h2 className="font-bold">Height:</h2>
                <span>{`${pokemon.height / 10}m`}</span>
            </div>
            <div className="flex gap-3">
                <h2 className="font-bold">Weight:</h2>
                <span>{`${pokemon.weight / 10}kg`}</span>
            </div>
            <div className="flex gap-3 items-center">
                <h2 className="font-bold">Abilities:</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((abilitie) => (
                        <div
                            className="py-1 shadow-md bg-red-500 px-4 rounded-md font-bold text-white"
                            key={abilitie.ability.name}
                        >
                            {abilitie.ability.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;
