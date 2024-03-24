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
            <div key={evo.species.name} className="flex items-center gap-3">
                <IoIosArrowForward />
                <div className="flex flex-col items-center">
                    <PokemonDisplay {...evo} />
                    <h3>{evo.species.name}</h3>
                </div>
                <div className=" space-y-3">
                    {evo.evolves_to && renderEvolutions(evo.evolves_to)}
                </div>
            </div>
        ));
    };

    return (
        <div className="flex gap-3 px-10 items-center bg-zinc-100 justify-center py-2 w-full">
            <div className="flex flex-col items-center">
                <PokemonDisplay {...firstEvo} />
                <h3>{firstEvo.species.name}</h3>
            </div>
            {firstEvo.evolves_to.length > 3 ? (
                <div className="flex items-center">
                    <IoIosArrowForward />
                    <div className="grid grid-cols-3">
                        {firstEvo.evolves_to.map((evo) => (
                            <PokemonDisplay {...evo} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className=" space-y-3">
                    {renderEvolutions(firstEvo.evolves_to)}
                </div>
            )}
        </div>
    );
};

export default PokemonFamily;
