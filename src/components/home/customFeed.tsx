import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import PostFeed from "@/components/common/postFeed";
import { notFound } from "next/navigation";

const CustomFeed = async () => {
  const session = await getAuthSession();

  if (!session) return notFound();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      community: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      community: {
        name: {
          in: followedCommunities.map((sub) => sub.community.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
