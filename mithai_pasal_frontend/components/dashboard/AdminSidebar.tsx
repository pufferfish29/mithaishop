import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

import { Home, Inbox, Calendar, Search, Settings, LogOut } from 'lucide-react';
import { GiWrappedSweet } from 'react-icons/gi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

const items = [
  { title: 'Sales Tracking', url: '#', icon: BsGraphUpArrow },
  { title: 'Products', url: '#', icon: MdOutlineProductionQuantityLimits },
];

const AdminSidebar = () => {
  return (
    <Sidebar>
      <div className="bg-[#fadcc3] h-screen">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="mt-10 flex  items-center gap-4">
                <div className="flex justify-center">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <GiWrappedSweet className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold">Sweet Shop</p>
                  <p className="text-md text-gray-500">Admin Panel</p>
                </div>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-20">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="w-8 h-8" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
      <SidebarFooter className=" bg-[#fadcc3]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/help">
                <Settings className="w-8 h-8" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/logout">
                <LogOut className="w-8 h-8" />
                <span>Log out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
