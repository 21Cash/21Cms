import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Link } from "react-router-dom";

function getTimeElapsedString(lastRefresh: string): string {
  const lastRefreshDate = new Date(lastRefresh);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - lastRefreshDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
}

const displayText = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "You only live once, but if you do it right, once is enough. - Mae West",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "Happiness depends upon ourselves. - Aristotle",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Act as if what you do makes a difference. It does. - William James",
  "The best way to predict the future is to invent it. - Alan Kay",
  "Opportunities don't happen. You create them. - Chris Grosser",
];

export function AppSidebar({
  selectedDate,
  setSelectedDate,
  setViewingDashboard,
  setViewingDayInfo,
  username,
  lastRefreshed,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setViewingDayInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setViewingDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  lastRefreshed: string;
}) {
  const randomMessage =
    displayText[Math.floor(Math.random() * displayText.length)];
  return (
    <Sidebar {...props}>
      <Link to="/">
        <a>
          <SidebarHeader className="border-sidebar-border h-16 border-b flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-105">
            <span className="text-center text-3xl font-bold">21CMS</span>
          </SidebarHeader>
        </a>
      </Link>
      <SidebarContent className="flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <div className="mb-4 p-4">
            <p className="text-xl font-semibold">Hi, {username}</p>
            <p className="mt-1 text-sm text-muted-foreground italic">
              {randomMessage}
            </p>
          </div>
          <div className="-mt-2">
            {" "}
            {/* Moves calendar slightly up */}
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setViewingDayInfo(true);
                  setViewingDashboard(false);
                }
              }}
              className="rounded-md border"
            />
          </div>
          <SidebarSeparator className="mx-0 my-3" />
          <Button
            className="w-full"
            onClick={() => {
              setViewingDashboard(true);
              setViewingDayInfo(false);
            }}
          >
            Main Dashboard
          </Button>
        </div>
        <div className="p-4 border-t border-muted">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Last Refreshed
          </p>
          <p className="text-sm font-medium">
            {getTimeElapsedString(lastRefreshed)}
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
