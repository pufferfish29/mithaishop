export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='max-w-[1500px] mx-auto px-10 overflow-y-auto'>
      {children}
    </div>
  );
}
