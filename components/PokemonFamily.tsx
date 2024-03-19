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

    console.log(currentEvo.evolves_to[0]);

    return (
        <div
            style={{
                gridTemplateColumns: `${
                    currentEvo.evolves_to.length > 3
                        ? "100px min-content 1fr"
                        : "1fr min-content 1fr min-content 1fr"
                }`,
            }}
            className="grid gap-8 items-center"
        >
            <div
                style={{ gridRow: `1 / ${currentEvo.evolves_to.length + 1}` }}
                className="col-start-1 row-start-1"
            >
                <PokemonDisplay {...evolutionData[0]} />
            </div>

            {currentEvo.evolves_to.length > 3 ? (
                <React.Fragment>
                    {currentEvo.evolves_to.length > 0 && (
                        <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                gridRow: `1 / ${
                                    currentEvo.evolves_to.length + 1
                                }`,
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    )}
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))]">
                        {currentEvo.evolves_to.map((evolution, i) => (
                            <PokemonDisplay
                                {...evolution}
                                key={evolution.species.name}
                            />
                        ))}
                    </div>
                </React.Fragment>
            ) : (
                currentEvo.evolves_to.map((evolution, i) => (
                    <React.Fragment key={i}>
                        {currentEvo.evolves_to.length > 0 && (
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ gridRow: i + 1 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        )}
                        <div style={{ gridRow: i + 1 }}>
                            <PokemonDisplay {...evolution} />
                        </div>

                        {evolution.evolves_to.map((evo) => (
                            <React.Fragment key={i}>
                                {currentEvo.evolves_to.length > 0 && (
                                    <svg
                                        className="w-6 h-6 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ gridRow: i + 1 }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                )}
                                <div style={{ gridRow: i + 1 }}>
                                    <PokemonDisplay {...evo} />
                                </div>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))
            )}
        </div>
    );
};

export default PokemonFamily;
