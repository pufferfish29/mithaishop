export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-[1700px] mx-auto px-10 overflow-y-auto">{children}</div>;
}
