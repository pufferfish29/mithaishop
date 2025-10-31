import AuthWrapper from "@/components/authwrapper";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      {" "}
      <div className='bg-[#f7f1ed]'>
        <SidebarProvider>
          <AdminSidebar />

          <main className='w-full overflow-y-auto'>
            <AdminHeader />

            {children}
          </main>
        </SidebarProvider>
      </div>
    </AuthWrapper>
  );
}
