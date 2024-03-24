import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";
import { IoIosArrowForward } from "react-icons/io";
import TypesDisplay from "./TypesDisplay";

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
            <div
                key={evo.species.name}
                className="flex items-center gap-3 flex-wrap"
            >
                <IoIosArrowForward />
                <div className="flex flex-col items-center flex-wrap">
                    <PokemonDisplay {...evo} />
                    <h3>{evo.species.name}</h3>
                    <TypesDisplay pokemon={evo.species.name} full={false} />
                </div>
                <div className=" space-y-3">
                    {evo.evolves_to && renderEvolutions(evo.evolves_to)}
                </div>
            </div>
        ));
    };

    return (
        <section className="space-y-5 px-10 bg-zinc-100 py-2">
            <div className="">
                <h2 className="bg-red-600 w-fit mx-auto text-zinc-100 px-5 py-2 rounded-md font-bold">
                    Evolution Line
                </h2>
            </div>

            <div className="flex gap-3 items-center flex-wrap justify-center">
                <div className="flex flex-col items-center">
                    <PokemonDisplay {...firstEvo} />
                    <h3>{firstEvo.species.name}</h3>
                    <TypesDisplay
                        pokemon={firstEvo.species.name}
                        full={false}
                    />
                </div>
                {firstEvo.evolves_to.length > 3 ? (
                    <div className="flex items-center flex-wrap">
                        <IoIosArrowForward />
                        <div className="grid grid-cols-3 gap-x-3">
                            {firstEvo.evolves_to.map((evo) => (
                                <div className="">
                                    <PokemonDisplay
                                        {...evo}
                                        key={evo.species.name}
                                    />
                                    <div className="flex items-center gap-3">
                                        <h3>{evo.species.name}</h3>

                                        <TypesDisplay
                                            pokemon={evo.species.name}
                                            full={false}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className=" space-y-3">
                        {renderEvolutions(firstEvo.evolves_to)}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PokemonFamily;
