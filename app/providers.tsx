"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { MyProvider } from "@/components/myContext";
import { Toaster } from 'sonner';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

//   <div className="relative flex flex-col"> 
//             <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
//               {children}
//             </main>
//           </div>

	return (
		<NextUIProvider className="min-h-dvh p-4 sm:p-0 flex justify-center items-center" navigate={router.push}>
			<NextThemesProvider  {...themeProps}>
				<Toaster />
				<MyProvider>
					{children}
				</MyProvider>
				
				
				</NextThemesProvider>
		</NextUIProvider>
	);
}
