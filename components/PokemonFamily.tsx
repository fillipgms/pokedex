import PokeAPI from "pokedex-promise-v2";
import React from "react";
import Image from "next/image";

const PokemonFamily = async (pokemon: PokeAPI.Pokemon) => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const species = await fetch(`${baseUrl}/pokemon-species/${pokemon.name}`);
    const speciesData = (await species.json()) as PokeAPI.PokemonSpecies;

    const family = await fetch(`${speciesData.evolution_chain.url}`);
    const familyData = (await family.json()) as PokeAPI.EvolutionChain;

    const evolutionUrls: string[] = [];

    let currentEvo = familyData.chain;
    while (currentEvo) {
        evolutionUrls.push(`${baseUrl}/pokemon/${currentEvo.species.name}`);
        currentEvo = currentEvo.evolves_to[0];
    }

    const evolutionResponses = await Promise.all(
        evolutionUrls.map((url) => fetch(url))
    );
    const evolutionData = await Promise.all(
        evolutionResponses.map((response) => response.json())
    );

    return (
        <div className="flex gap-2">
            {evolutionData.map((evolution, index) => (
                <a
                    href={`/${evolution.name}`}
                    key={index}
                    className=" bg-white/25 rounded-md"
                >
                    <Image
                        src={evolution.sprites.front_default}
                        alt={evolution.name}
                        height={96}
                        width={96}
                    />
                </a>
            ))}
        </div>
    );
};

export default PokemonFamily;
