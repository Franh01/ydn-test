import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Detalles de hobby",
  description: "Detalle de hobby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
