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
        <main>
            <GenerationHeader />
            <Suspense fallback={<HomeLoading />}>
                <AllPokemon gen={gen} />
            </Suspense>
        </main>
    );
}
