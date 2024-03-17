"use client";
import Image from "next/image";
import PokeAPI from "pokedex-promise-v2";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PokemonImage = (pokemon: PokeAPI.Pokemon) => {
    const [selectedImage, setSelectedImage] = useState<string>();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchImage() {
            const isMega = searchParams.get("mega") === "true";
            const isFemale = searchParams.get("female") === "true";

            const imageName =
                pokemon.name.toLowerCase() +
                (isMega ? "_Mega" : "") +
                (isFemale ? "_Female" : "") +
                ".gif";
            const imagePath = `/assets/gifs/${imageName}`;

            const imageExists = await checkImageExists(imagePath);

            if (imageExists) {
                setSelectedImage(imagePath);
            } else {
                setSelectedImage(pokemon.sprites.front_default);
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
        <Image
            src={selectedImage as string}
            alt={pokemon.name}
            height={200}
            width={200}
            className="w-64 h-64 object-contain"
            unoptimized
        />
    );
};

export default PokemonImage;
