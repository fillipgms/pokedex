"use client";
import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import types from "@/data/types";

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
                    isFemale
                        ? pokemon.sprites.front_female
                        : pokemon.sprites.front_default
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
        </div>
    );
};

export default PokemonImage;
