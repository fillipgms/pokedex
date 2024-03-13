import React from "react";

interface displayProps {
    pokemonName: string | null;
}

const DisplayPokemon = async ({ pokemonName = "bulbasaur" }: displayProps) => {
    return <div>{pokemonName}</div>;
};

export default DisplayPokemon;
