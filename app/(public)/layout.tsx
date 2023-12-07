import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="public-layout">{children}</div>;
}
