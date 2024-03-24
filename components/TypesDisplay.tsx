import React from "react";
import types from "@/data/types";
import PokeAPI from "pokedex-promise-v2";
import Image from "next/image";

const TypesDisplay = ({
    type,
    full = true,
}: {
    type: PokeAPI.PokemonType;
    full?: boolean;
}) => {
    return (
        <div
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
                className="p-1.5"
            />
            {full && <span className="px-3">{type.type.name}</span>}
        </div>
    );
};

export default TypesDisplay;
