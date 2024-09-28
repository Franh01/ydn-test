import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Editar usuario",
  description: "Edición de usuario con hobbies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
