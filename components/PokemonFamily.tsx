import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";

const PokemonFamily = async (pokemon: PokeAPI.Pokemon) => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const species = await fetch(`${baseUrl}/pokemon-species/${pokemon.name}`);
    const speciesData = (await species.json()) as PokeAPI.PokemonSpecies;

    const family = await fetch(`${speciesData.evolution_chain.url}`);
    const familyData = (await family.json()) as PokeAPI.EvolutionChain;

    const evolutionUrls: string[] = [];

    let currentEvo = familyData.chain;

    const addEvolutionsToList = (evoChain: PokeAPI.ChainLink) => {
        if (!evoChain) return;
        evolutionUrls.push(`${baseUrl}/pokemon/${evoChain.species.name}`);
        evoChain.evolves_to.forEach((evolution) =>
            addEvolutionsToList(evolution)
        );
    };

    addEvolutionsToList(currentEvo);

    const evolutionResponses = await Promise.all(
        evolutionUrls.map((url) => fetch(url))
    );
    const evolutionData = await Promise.all(
        evolutionResponses.map((response) => response.json())
    );

    return (
        <div className="flex gap-2 justify-center">
            {evolutionData.map((evolution, i) => (
                <PokemonDisplay {...evolution} key={i} />
            ))}
        </div>
    );
};

export default PokemonFamily;
