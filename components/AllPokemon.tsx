import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React from "react";

interface AllPokemonInfo {
    gen: string | string[];
}

const genCount = {
    1: { count: 151, offset: 0 },
    2: { count: 100, offset: 151 },
    3: { count: 135, offset: 251 },
    4: { count: 107, offset: 386 },
    5: { count: 156, offset: 493 },
    6: { count: 72, offset: 649 },
    7: { count: 88, offset: 721 },
    8: { count: 96, offset: 809 },
    9: { count: 120, offset: 905 },
};

const AllPokemon = async (gen: AllPokemonInfo) => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const parseGen = Array.isArray(gen.gen)
        ? parseInt(gen.gen[0])
        : parseInt(gen.gen as string);

    const res = await fetch(
        `${baseUrl}pokemon?limit=${
            genCount[parseGen as keyof typeof genCount].count
        }&offset=${genCount[parseGen as keyof typeof genCount].offset}`
    );
    const data = await res.json();

    const pokemonInfoPromises = data.results.map(
        async (result: PokeAPI.Pokemon) => {
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
        <div className="px-5 md:px-12 grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))] justify-items-center content-center gap-3">
            {pokemonInfoArray.map((poke: PokeAPI.Pokemon) => (
                <a
                    href={`/${poke.name}`}
                    key={poke.id}
                    className=" bg-white/25 rounded-md"
                >
                    <Image
                        src={poke.sprites.front_default}
                        alt={poke.name}
                        height={96}
                        width={96}
                    />
                </a>
            ))}
        </div>
    );
};

export default AllPokemon;
