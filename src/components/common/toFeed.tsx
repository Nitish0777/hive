"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

const ToFeedButton = () => {
  const pathname = usePathname();
  const communityPath = getCommunityPath(pathname);

  return (
    <a href={communityPath} className={buttonVariants({ variant: "ghost" })}>
      <ChevronLeft className="h-4 w-4 mr-1" />
      {communityPath === "/" ? "Back home" : "Back to community"}
    </a>
  );
};

const getCommunityPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  if (splitPath.length === 3) return "/";
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  else return "/";
};

export default ToFeedButton;
