"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";
import ToastProvider from "./ToastProvider";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      {children}
      <ToastProvider />
    </NextThemesProvider>
  );
};
