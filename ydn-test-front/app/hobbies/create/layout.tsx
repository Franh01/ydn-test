import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Crear hobby",
  description: "Crear hobby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
