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
            <header className="py-2 px-4 md:px-16 flex items-center gap-3 capitalize font-semibold">
                <a href={`/?gen=${generation}`}>
                    <IoIosArrowBack />
                </a>
                <span>{pokemon.name}</span>
            </header>
            <main className="flex md:flex-row flex-col md:*:flex-1">
                <section className="flex items-center justify-center">
                    <div className="max-w-sm">
                        <div
                            className="text-center py-2 font-bold text-white capitalize"
                            style={{
                                background: `${
                                    types[pokemon.types[0].type.name].bg
                                }CC`,
                            }}
                        >
                            <h2>{pokemon.name}</h2>
                        </div>
                        <div
                            style={{
                                background: `${
                                    types[pokemon.types[0].type.name].color
                                }40`,
                            }}
                            className="w-fit py-3  px-5 "
                        >
                            <PokemonImage {...pokemon} />
                        </div>

                        <div
                            className="flex justify-center flex-wrap gap-3 py-3"
                            style={{
                                background: `${
                                    types[pokemon.types[0].type.name].bg
                                }CC`,
                            }}
                        >
                            {pokemon.types.map((type) => (
                                <TypesDisplay {...type} key={type.type.name} />
                            ))}
                        </div>
                    </div>
                </section>
                <section>oi</section>
            </main>
        </>
    );
}
