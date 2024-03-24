import React from "react";
import PokeAPI from "pokedex-promise-v2";
import TypesDisplay from "./TypesDisplay";

const PokemonDetails = async (pokemon: PokeAPI.Pokemon) => {
    return (
        <div className=" flex justify-center px-10 flex-col">
            <div className="flex gap-3">
                <h2>Id:</h2>
                <span>{pokemon.id}</span>
            </div>
            <div className="flex gap-3">
                <h2>Height:</h2>
                <span>{`${pokemon.height / 10}m`}</span>
            </div>
            <div className="flex gap-3">
                <h2>Weight:</h2>
                <span>{`${pokemon.weight / 10}kg`}</span>
            </div>
        </div>
    );
};

export default PokemonDetails;
