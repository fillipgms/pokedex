import Image from "next/image";
import React from "react";
interface PokemonResponse {
    name: string;
    url: string;
}

interface PokemonInfo {
    abilities: any;
    base_experience: number;
    cries: any;
    forms: any;
    game_indices: any;
    height: number;
    held_items: any;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any;
    name: string;
    order: number;
    past_abilities: any;
    past_types: any;
    species: any;
}

const AllPokemon = async () => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon?limit=151`);
    const data = await res.json();

    const pokemonInfoPromises = data.results.map(
        async (result: PokemonResponse) => {
            const response = await fetch(`${baseUrl}pokemon/${result.name}`);
            const pokemonInfo = await response.json();
            return pokemonInfo;
        }
    );

    const pokemonInfoArray = await Promise.all(pokemonInfoPromises).catch(
        (error) => console.error("Error fetching Pokemon data:", error)
    );

    if (!pokemonInfoArray) return;

    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))]">
            {pokemonInfoArray.map((poke: PokemonInfo) => (
                <div>
                    <a href={`/${poke.name}`}>
                        <Image
                            src={poke.sprites.front_default}
                            alt={poke.name}
                            height={96}
                            width={96}
                        />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default AllPokemon;
