import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import "./globals.css";

const wix = Wix_Madefor_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pokedex",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${wix.className} bg-grass h-full`}>
                {children}
            </body>
        </html>
    );
}
