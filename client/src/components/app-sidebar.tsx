import * as React from "react";
import { Plus } from "lucide-react";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

export function AppSidebar({
  selectedDate,
  setSelectedDate,
  setViewingDashboard,
  setViewingDayInfo,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setViewingDayInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setViewingDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            date && setSelectedDate(date);
            setViewingDayInfo(true);
            setViewingDashboard(false);
          }}
          className="rounded-md border"
        />
        <SidebarSeparator className="mx-0" />
        <Button
          onClick={() => {
            setViewingDashboard(true);
            setViewingDayInfo(false);
          }}
        >
          {" "}
          Main Dashboard{" "}
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}
