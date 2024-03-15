import AllPokemon from "@/components/AllPokemon";
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
            <Suspense fallback={<HomeLoading />}>
                <AllPokemon gen={gen} />
            </Suspense>
        </main>
    );
}
