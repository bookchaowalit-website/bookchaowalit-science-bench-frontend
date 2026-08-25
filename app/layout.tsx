import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Observation Bench — Science Lab",
  description: "A small experiment notebook for changing one variable and recording an observation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
