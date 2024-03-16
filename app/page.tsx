import AllPokemon from "@/components/AllPokemon";
import GenerationHeader from "@/components/GenerationHeader";
import HomeLoading from "@/components/HomeLoading";
import { Suspense } from "react";

export default function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const gen = searchParams["gen"] ?? "1";

    return (
        <main className="bg-gradient-to-tr from-pink-200 to-sky-200">
            <GenerationHeader />
            <Suspense fallback={<HomeLoading />}>
                <AllPokemon gen={gen} />
            </Suspense>
        </main>
    );
}
