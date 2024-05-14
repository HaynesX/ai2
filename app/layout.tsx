import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			
			<body
        className="min-h-dvh font-sans antialiased"
        
      >
		<div className="fixed bg-cover animate-fade-in h-full w-full z-[-1]" style={{ backgroundImage: "url('bg3.png')" }}></div>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
				{/* <div className="relative flex flex-col"> 
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div> */}

					{children}


				</Providers>
			</body>
		</html>
	);
}
