export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[#f7b986]">{children}</div>;
}
