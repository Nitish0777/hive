import CustomFeed from "@/components/home/customFeed";
import GeneralFeed from "@/components/home/generalFeed";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="text-2xl font-bold mx-5 mb-2">Your Feed</h1>
      <hr className="mx-5 " />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* community info */}
        <div className="">
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle>Home</CardTitle>
              <CardDescription>
                Your personal Hive frontpage. Come here to check in with your
                favorite communities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col px-4 py-4">
              <Link href="r/create">
                <Button variant="default" className="w-full bg-primary">
                  Create Community
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle>Popular Communitites</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col px-4 py-2 space-y-1">
              <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Name</p>
                  <p className="text-sm text-muted-foreground">Short desc</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
