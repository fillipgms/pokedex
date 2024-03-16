import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import PokeAPI from "pokedex-promise-v2";
import PokemonFamily from "@/components/PokemonFamily";

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

    return (
        <main className="bg-gradient-to-tr from-pink-200 to-sky-200 h-svh flex *:flex-1">
            <div></div>
            <div className="flex flex-col items-center justify-center">
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
                />
                <PokemonFamily {...data} />
            </div>
        </main>
    );
}
