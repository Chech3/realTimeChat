"use client";
import { useNavigation } from "@/app/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from '../../../ui/theme/theme-toggle';

const DesktopNav = () => {
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle/>
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
