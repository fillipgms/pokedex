import AllPokemon from "@/components/AllPokemon";
import HomeLoading from "@/components/HomeLoading";
import { Suspense } from "react";

export default function Home() {
    return (
        <main>
            <Suspense fallback={<HomeLoading />}>
                <AllPokemon />
            </Suspense>
        </main>
    );
}
