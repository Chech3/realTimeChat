"use client";
import { useConversation } from "@/app/hooks/useConversation";
import { useNavigation } from "@/app/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li className="relative" key={id}>
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`${path.active ? "bg-blue-400 dark:bg-blue-800" : "hover:bg-blue-200 dark:hover:bg-blue-400"}  p-2 rounded-md transition-all`}
                      >
                        {path.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
          <li className="">
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
