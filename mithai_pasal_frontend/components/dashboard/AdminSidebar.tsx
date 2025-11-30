"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import {
  Settings,
  LogOut,
  Candy,
  LineChart,
  Package,
  User2,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logoutUser } from "@/apicalls/auth/action";
import { useSession } from "next-auth/react";

const items = [
  { title: "Sales Tracking", url: "/dashboard/sales", icon: LineChart },
  { title: "Products", url: "/dashboard/products", icon: Package },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: User2,
  },
];

const footerItem = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Logout", url: "/dashboard/login", icon: LogOut },
];

const AdminSidebar = () => {
  const location = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      console.log(errorMessage);
    }
  };

  const { data: session } = useSession();

  return (
    <Sidebar>
      <div className='bg-[#fadcc3] h-screen flex flex-col justify-between'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className='mt-10 flex items-center gap-4'>
                <div className='flex justify-center'>
                  <div className='bg-orange-500 p-3 rounded-full'>
                    <Candy className='w-8 h-8 text-white' />
                  </div>
                </div>
                <div>
                  <p className='text-xl font-bold'>Sweet Shop</p>
                  <p className='text-md text-gray-500'>Admin Panel</p>
                </div>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className='mt-20'>
                {items
                  .filter((menu) => {
                    if (
                      menu.title === "Users" &&
                      session?.user.role !== "admin"
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((item) => {
                    const activeSidebar =
                      item.url === "/dashboard"
                        ? location === item.url
                        : location?.startsWith(item.url);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            className={`${
                              activeSidebar && "bg-amber-600 text-white"
                            }`}
                            href={item.url}
                          >
                            <item.icon className='w-10 h-10' />
                            <span className='text-[18px]'>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='bg-[#fadcc3]'>
          <SidebarMenu>
            <Button
              onClick={() => router.push("/dashboard/products/add")}
              className='bg-orange-500 hover:bg-orange-600 cursor-pointer'
            >
              New Product
            </Button>

            {footerItem.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Button
                    onClick={() => {
                      if (item.title === "Logout") {
                        logout();
                      } else if (item.title === "Settings") {
                        console.log("");
                      }
                    }}
                    className=' bg-white text-black flex items-center justify-center '
                  >
                    <item.icon className='w-10 h-10' />
                    <span className='text-[18px]'>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
