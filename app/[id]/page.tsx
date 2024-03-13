import Image from "next/image";
import fs from "fs/promises";
import path from "path";

interface HomePageProps {
    params: {
        id: string;
    };
}

export default async function PokemonPage({ params: { id } }: HomePageProps) {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon/${id}`);
    const data = await res.json();

    const imagesDir = path.join(process.cwd(), "public/assets/gifs");
    const imageFiles = await fs.readdir(imagesDir);

    const selectedImage = imageFiles.find((file) =>
        file.toLowerCase().includes(id.toLowerCase())
    );

    if (!selectedImage) {
        return;
    }

    return (
        <main>
            <Image
                src={`/assets/gifs/${selectedImage}`}
                alt={id}
                width={200}
                height={200}
            />
        </main>
    );
}
