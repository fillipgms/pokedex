"use client";
import React, { useEffect, useState } from "react";
import types from "@/data/types";
import PokeAPI, { Pokemon } from "pokedex-promise-v2";
import Image from "next/image";

const TypesDisplay = ({
    pokemon,
    full = true,
}: {
    pokemon: PokeAPI.Pokemon | string;
    full?: boolean;
}) => {
    const [pokemonData, setPokemonData] = useState<PokeAPI.Pokemon | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            if (typeof pokemon === "string") {
                const data = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
                );
                const res = await data.json();
                setPokemonData(res);
            } else {
                setPokemonData(pokemon);
            }
        };

        fetchData();

        return () => {
            setPokemonData(null);
        };
    }, [pokemon]);

    if (!pokemonData) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="flex justify-center   flex-wrap gap-3 ">
            {pokemonData.types.map((type) => (
                <div
                    key={type.slot}
                    style={{
                        background: types[type.type.name].bg,
                    }}
                    className="flex items-center text-white uppercase  overflow-hidden rounded-md"
                >
                    <Image
                        src={types[type.type.name].icon}
                        alt={type.type.name}
                        height={30}
                        width={30}
                        style={{
                            background: types[type.type.name].color,
                        }}
                        className="p-1.5"
                    />
                    {full && <span className="px-3">{type.type.name}</span>}
                </div>
            ))}
        </div>
    );
};

export default TypesDisplay;
