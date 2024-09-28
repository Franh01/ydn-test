import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Crear usuario",
  description: "Crear usuario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
