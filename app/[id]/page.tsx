import PokeAPI from "pokedex-promise-v2";
import PokemonFamily from "@/components/PokemonFamily";
import types from "@/data/types";
import { IoIosArrowBack } from "react-icons/io";
import generations from "@/data/generations";
import TypesDisplay from "@/components/TypesDisplay";
import PokemonImage from "@/components/PokemonImage";

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

    let generation: string | number = 1;
    for (const key in generations) {
        if (Object.prototype.hasOwnProperty.call(generations, key)) {
            const gen = generations[key];
            if (pokemon.id <= gen.offset + gen.count) {
                generation = key;
                break;
            }
        }
    }

    return (
        <>
            <header className="py-3 bg-zinc-100 shadow-xl z-[3] fixed w-full px-5 md:px-16 flex items-center gap-3 capitalize font-semibold">
                <a href={`/?gen=${generation}`}>
                    <IoIosArrowBack />
                </a>
                <span>{pokemon.name}</span>
            </header>
            <main className="flex h-full md:pt-12 pt-20 md:flex-row flex-col md:*:flex-1">
                <section className="flex items-center justify-center md:px-00 px-10">
                    <div className="max-w-sm shadow-xl rounded-sm overflow-hidden">
                        <div className="text-center py-3 bg-red-600 text-white font-bold capitalize">
                            <h2>{pokemon.name}</h2>
                        </div>
                        <div className="block bg-slate-800 h-3 w-full relative">
                            <span className="rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-800">
                                <span className="block bg-white h-5 w-5 rounded-full"></span>
                            </span>
                        </div>

                        <PokemonImage {...pokemon} />

                        <div className="flex justify-center z-[2] bg-zinc-100 flex-wrap gap-3 py-4">
                            {pokemon.types.map((type) => (
                                <TypesDisplay {...type} key={type.type.name} />
                            ))}
                        </div>
                    </div>
                </section>
                <section></section>
            </main>
        </>
    );
}
