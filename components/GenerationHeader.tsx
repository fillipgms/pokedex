"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const GenerationHeader = () => {
    const [generation, setGeneration] = useState<number>(1);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const genParam = searchParams.get("gen");
        if (genParam) {
            const gen = parseInt(genParam);
            if (!isNaN(gen)) {
                setGeneration(gen);
            }
        }
    }, [searchParams]);

    const goToNextGeneration = () => {
        if (generation < 9) {
            const nextGeneration = generation + 1;
            router.push(`/?gen=${nextGeneration}`);
        } else {
            router.push(`/?gen=1`);
        }
    };

    const goToPreviousGeneration = () => {
        if (generation > 1) {
            const previousGeneration = generation - 1;
            router.push(`/?gen=${previousGeneration}`);
        } else {
            router.push(`/?gen=9`);
        }
    };

    const generationChange = (event: string) => {
        router.push(`/?gen=${event}`);
    };

    return (
        <header className="sticky top-4  flex justify-between items-center font-medium  max-w-md mx-auto shadow-lg py-3 px-5 rounded-full bg-white">
            <button onClick={goToPreviousGeneration}>
                <IoIosArrowBack />
            </button>
            <Select
                onValueChange={(value) => generationChange(value)}
                value={generation.toString()}
            >
                <SelectTrigger className="w-[180px] border-none shadow-transparent justify-center gap-2">
                    <SelectValue placeholder={`Generation ${generation}`} />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 9 }, (_, index) => (
                        <SelectItem
                            key={`${index + 1}`}
                            value={`${index + 1}`}
                            className="justify-center"
                        >
                            Generation {index + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <button onClick={goToNextGeneration}>
                <IoIosArrowForward />
            </button>
        </header>
    );
};

export default GenerationHeader;
