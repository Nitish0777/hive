"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC, useRef } from "react";
import EditorOutput from "@/components/common/editorOutput";
import PostVoteClient from "@/components/post-vote/postVoteClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  communityName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  communityName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs text-secondary-foreground">
          {communityName ? (
            <>
              <a
                className="text-sm text-primary underline underline-offset-2"
                href={`/r/${communityName}`}
              >
                r/{communityName}
              </a>
              <span className="px-1">•</span>
            </>
          ) : null}
          <span>Posted by u/{post.author.username}</span>{" "}
          <span className="text-muted-foreground">
            {formatTimeToNow(new Date(post.createdAt))}
          </span>
        </CardTitle>

        <CardContent
          className="max-h-40 w-full overflow-clip text-sm"
          ref={pRef}
        >
          <Link href={`/r/${communityName}/post/${post.id}`}>
            <h1 className="py-2 text-lg font-semibold leading-6 text-secondary-foreground">
              {post.title}
            </h1>
          </Link>
          <EditorOutput content={post.content} />
          {pRef.current?.clientHeight === 160 ? (
            // blur bottom if content is too long
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t "></div>
          ) : null}
        </CardContent>
      </CardHeader>

      <CardFooter className="justify-between">
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />
        <Link
          href={`/r/${communityName}/post/${post.id}`}
          className="flex w-fit items-center gap-2 text-sm  "
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </CardFooter>
    </Card>
  );
};
export default Post;
