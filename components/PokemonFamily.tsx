import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";
import { IoIosArrowForward } from "react-icons/io";

const PokemonFamily = async (pokemon: PokeAPI.Pokemon) => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const species = await fetch(`${baseUrl}/pokemon-species/${pokemon.name}`);
    const speciesData = (await species.json()) as PokeAPI.PokemonSpecies;

    const family = await fetch(`${speciesData.evolution_chain.url}`);
    const familyData = (await family.json()) as PokeAPI.EvolutionChain;

    const evolutionUrls: string[] = [];
    let firstEvo = familyData.chain;

    const addEvolutionsToList = (evoChain: PokeAPI.ChainLink) => {
        if (!evoChain) return;
        evolutionUrls.push(`${baseUrl}/pokemon/${evoChain.species.name}`);
        evoChain.evolves_to.forEach((evolution) =>
            addEvolutionsToList(evolution)
        );
    };

    addEvolutionsToList(firstEvo);

    const renderEvolutions = (evolutions: PokeAPI.ChainLink[]) => {
        return evolutions.map((evo) => (
            <div key={evo.species.name} className="flex  items-center gap-3">
                <IoIosArrowForward />
                <PokemonDisplay {...evo} />
                <div>{evo.evolves_to && renderEvolutions(evo.evolves_to)}</div>
            </div>
        ));
    };

    return (
        <div className="flex items-center">
            <div>
                <PokemonDisplay {...firstEvo} />
            </div>
            <div>{renderEvolutions(firstEvo.evolves_to)}</div>
        </div>
    );
};

export default PokemonFamily;
