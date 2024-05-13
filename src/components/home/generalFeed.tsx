import { db } from "@/lib/db";
import PostFeed from "@/components/common/postFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
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

export default GeneralFeed;
