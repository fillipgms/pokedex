import PokeAPI from "pokedex-promise-v2";
import { IoIosArrowBack } from "react-icons/io";
import generations from "@/data/generations";
import PokemonImage from "@/components/PokemonImage";
import PokemonStats from "@/components/PokemonStats";
import PokemonDetails from "@/components/PokemonDetails";
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
            <header className="py-3 bg-zinc-100 shadow-xl z-[3] fixed w-full md:px-16 flex items-center gap-3 capitalize font-semibold">
                <a href={`/?gen=${generation}`}>
                    <IoIosArrowBack />
                </a>
                <span>{pokemon.name}</span>
            </header>
            <main className="md:space-y-3 space-y-10">
                <section className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-5 md:pt-12 pt-20 min-h-svh">
                    <PokemonDetails {...pokemon} />
                    <div className="flex items-center px-10 justify-center">
                        <PokemonImage {...pokemon} />
                    </div>
                    <PokemonStats {...pokemon} />
                </section>
                <PokemonFamily {...pokemon} />
            </main>
        </>
    );
}
