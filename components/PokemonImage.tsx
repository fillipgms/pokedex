"use client";
import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import types from "@/data/types";
import { MdCatchingPokemon } from "react-icons/md";
import PokeballIcon from "@/public/PokeballIcon.svg";
import TypesDisplay from "./TypesDisplay";

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
        <div className="max-w-sm w-full shadow-xl rounded-sm overflow-hidden">
            <div className="text-center py-3 bg-red-600 text-white font-bold capitalize">
                <h2>{pokemon.name}</h2>
            </div>

            <div className="block bg-slate-800 h-3 w-full relative">
                <span className="rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-800">
                    <span className="block bg-white h-5 w-5 rounded-full"></span>
                </span>
            </div>

            <div
                className={`${
                    selectedImage === "" ? " max-h-0" : "max-h-96 py-3 px-5"
                } transition-all duration-300 w-full flex items-center justify-center  -z-[1] relative`}
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
                        className="md:w-80 md:h-80 w-full max-w-sm aspect-square object-contain"
                        unoptimized
                    />
                )}
            </div>
            <div className="flex justify-center z-[2] bg-zinc-100 flex-wrap gap-3 py-4">
                {pokemon.types.map((type) => (
                    <TypesDisplay type={type} />
                ))}
            </div>
        </div>
    );
};

export default PokemonImage;
