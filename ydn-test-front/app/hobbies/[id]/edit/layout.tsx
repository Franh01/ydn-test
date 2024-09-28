import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Editar hobby",
  description: "Edición de hobby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
