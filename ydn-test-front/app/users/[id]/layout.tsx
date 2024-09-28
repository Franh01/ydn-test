import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YDN Detalles de usuario",
  description: "User detail with hobbies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
