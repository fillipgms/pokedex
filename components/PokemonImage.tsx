"use client";
import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import types from "@/data/types";
import { MdCatchingPokemon } from "react-icons/md";

const PokemonImage = (pokemon: PokeAPI.Pokemon) => {
    const [selectedImage, setSelectedImage] = useState<string>("");
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchImage() {
            setSelectedImage("");
            const isMega = searchParams.get("mega") === "true";
            const isFemale = searchParams.get("female") === "true";

            const imageName =
                pokemon.name.replace("-", "_").toLowerCase() +
                (isMega ? "_Mega" : "") +
                (isFemale ? "_Female" : "") +
                ".gif";
            const imagePath = `/assets/gifs/${imageName}`;

            const imageExists = await checkImageExists(imagePath);

            if (imageExists) {
                setSelectedImage(imagePath);
            } else {
                setSelectedImage(
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                );
            }
        }

        fetchImage();
    }, [pokemon, searchParams]);

    async function checkImageExists(imagePath: string): Promise<boolean> {
        try {
            const response = await fetch(imagePath);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    return (
        <div
            className={`${
                selectedImage === "" ? " max-h-0" : "max-h-96 py-3 px-5"
            } transition-all duration-300 md:w-[22.5rem] w-fit -z-[1] relative`}
            style={{
                background: `${types[pokemon.types[0].type.name].color}40`,
            }}
        >
            {selectedImage && (
                <Image
                    src={selectedImage as string}
                    alt={pokemon.name}
                    height={200}
                    width={200}
                    className="md:w-80 md:h-80 w-full aspect-square object-contain"
                    unoptimized
                />
            )}

            <span className="absolute top-1/2 left-1/2 opacity-25 -translate-x-1/2 rounded-full overflow-hidden -translate-y-1/2 -z-[1] min-h-64 min-w-64 flex flex-col">
                <div className="bg-red-600 rounded-t-full flex-1"></div>
                <div className="block bg-slate-800 h-5 w-full relative">
                    <span className="rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800">
                        <span className="block bg-white h-8 w-8 rounded-full"></span>
                    </span>
                </div>
                <div className="flex-1 bg-white  rounded-b-full"></div>
            </span>
        </div>
    );
};

export default PokemonImage;
