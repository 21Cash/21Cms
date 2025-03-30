import * as React from "react";
import { Plus } from "lucide-react";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <a>
          <SidebarHeader className="border-sidebar-border h-16 border-b flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-105">
            <span className="text-center text-3xl font-bold">21CMS</span>
          </SidebarHeader>
        </a>
      </Link>
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
          className="mx-2 my-1"
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
