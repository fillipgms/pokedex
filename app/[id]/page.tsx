import PokeAPI from "pokedex-promise-v2";
import React from "react";
import PokemonHeader from "@/components/PokemonHeader";
import PokemonDetails from "@/components/PokemonDetails";
import PokemonImage from "@/components/PokemonImage";
import PokemonStats from "@/components/PokemonStats";
import PokemonFamily from "@/components/PokemonFamily";

interface HomePageProps {
    params: {
        id: string;
    };
}

export default async function PokemonPage({ params: { id } }: HomePageProps) {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon/${id}`);

    if (!res.ok)
        return (
            <div className="h-full flex items-center justify-center">
                <h2>Pokemon não encontrado</h2>
            </div>
        );

    const pokemon = (await res.json()) as PokeAPI.Pokemon;

    return (
        <React.Fragment>
            <PokemonHeader {...pokemon} />
            <main className="pt-12 space-y-3">
                <section className="grid px-10 md:px-28 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-h-svh items-center">
                    <PokemonDetails {...pokemon} />
                    <PokemonImage {...pokemon} />
                    <PokemonStats {...pokemon} />
                </section>
                <PokemonFamily {...pokemon} />
            </main>
        </React.Fragment>
    );
}
