"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CreateCommunityPayload } from "@/lib/validators/community";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CreateCommunityPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/community", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast("Community already exists.", {
            description: "Please choose a different name.",
          });
        }

        if (err.response?.status === 422) {
          return toast("Invalid community name.", {
            description: "Please choose a name between 3 and 21 letters.",
          });
        }

        if (err.response?.status === 401) {
          return toast("You must be logged in to create a community.", {
            description: "Please login and try again.",
            action: {
              label: "Login",
              onClick: () => router.push("/sign-in"),
            },
          });
        }
      }

      toast("There was an error.", {
        description: "Could not create community.",
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  return (
    <div className="mx-auto flex h-full max-w-3xl items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Create a Community
          </CardTitle>
          <hr className="mt-2" />
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-lg font-medium">Name</p>
          <p className="pb-2 text-xs">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex justify-end gap-4">
          <Button
            disabled={isPending}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          {/* make button unclickable if input.length === 0 */}
          <Button
            disabled={isPending || input.length === 0}
            onClick={() => createCommunity()}
            className="bg-primary"
          >
            Create Community
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
