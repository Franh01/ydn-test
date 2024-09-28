import DefaultLayout from "../common/components/DefaultLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Usuarios",
  description: "Usuarios con sus opciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
