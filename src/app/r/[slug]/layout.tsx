import SubscribeLeaveToggle from "@/components/common/subscribeLeaveToggle";
import ToFeedButton from "@/components/common/toFeed";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          community: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!community) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      community: {
        name: slug,
      },
    },
  });

  return (
    <div className="mx-auto h-full max-w-7xl pt-12 sm:container">
      <div>
        <ToFeedButton />

        <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
          <ul className="col-span-2 flex flex-col space-y-6">{children}</ul>

          {/* info sidebar */}
          <Card className="order-first h-fit overflow-hidden rounded-lg bg-card  md:order-last">
            <CardHeader className="px-6 py-4">
              <p className="py-3 font-semibold">About r/{community.name}</p>
              <hr />
            </CardHeader>
            <CardContent>
              <dl className="divide-y bg-card px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-secondary-foreground">Created</dt>
                  <dd className="text-muted-foreground">
                    <time dateTime={community.createdAt.toDateString()}>
                      {format(community.createdAt, "MMMM d, yyyy")}
                    </time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-secondary-foreground">Members</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="text-muted-foreground">{memberCount}</div>
                  </dd>
                </div>
                {community.creatorId === session?.user?.id ? (
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-secondary-foreground">
                      You created this community
                    </dt>
                  </div>
                ) : null}

                {community.creatorId !== session?.user?.id ? (
                  <SubscribeLeaveToggle
                    isSubscribed={isSubscribed}
                    communityId={community.id}
                    communityName={community.name}
                  />
                ) : null}
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "mb-6 w-full",
                  })}
                  href={`r/${slug}/submit`}
                >
                  Create Post
                </Link>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Layout;
