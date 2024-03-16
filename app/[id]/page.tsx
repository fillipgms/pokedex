import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import PokeAPI from "pokedex-promise-v2";
import PokemonFamily from "@/components/PokemonFamily";
import types from "@/data/types";
import { IoIosArrowBack } from "react-icons/io";
import generations from "@/data/generations";

interface HomePageProps {
    params: {
        id: string;
    };
}

export default async function PokemonPage({ params: { id } }: HomePageProps) {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon/${id}`);
    const data = (await res.json()) as PokeAPI.Pokemon;

    const imagesDir = path.join(process.cwd(), "public/assets/gifs");
    const imageFiles = await fs.readdir(imagesDir);

    const selectedImage = imageFiles.find((file) =>
        file.toLowerCase().includes(id.toLowerCase())
    );

    let generation: string | number = 1;
    for (const key in generations) {
        if (Object.prototype.hasOwnProperty.call(generations, key)) {
            const gen = generations[key];
            if (data.id <= gen.offset + gen.count) {
                generation = key;
                break;
            }
        }
    }

    return (
        <main className="bg-gradient-to-tr from-pink-200 to-sky-200 h-svh">
            <header className="flex font-bold gap-5 items-center just-around capitalize py-3 px-4 md:px-10">
                <a href={`/?gen=${generation}`}>
                    <IoIosArrowBack />
                </a>
                <h2>{data.name}</h2>
                <div className="flex gap-3">
                    {data.types.map((type, index) => (
                        <div
                            key={index}
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
                                className="p-1"
                            />
                            <span className="px-3">{type.type.name}</span>
                        </div>
                    ))}
                </div>
            </header>
            <main className="flex h-full items-center md:flex-row flex-col *:flex-1">
                <section className="md:px-10 px-4 flex items-center flex-col justify-center space-y-3">
                    <Image
                        src={
                            selectedImage
                                ? `/assets/gifs/${selectedImage}`
                                : data.sprites.front_default
                        }
                        alt={data.name}
                        height={200}
                        width={200}
                        unoptimized
                        priority
                        className="h-64 w-64 object-contain"
                    />

                    <PokemonFamily {...data} />
                </section>
                <div></div>
            </main>
        </main>
    );
}
