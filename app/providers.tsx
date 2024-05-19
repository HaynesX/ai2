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

	return (
		<NextUIProvider className="min-h-dvh p-4 sm:p-0 sm:flex sm:justify-center sm:items-center" navigate={router.push}>
			<NextThemesProvider  {...themeProps}>
				<Toaster />
				<MyProvider>
					{children}
				</MyProvider>
				
				
				</NextThemesProvider>
		</NextUIProvider>
	);
}
