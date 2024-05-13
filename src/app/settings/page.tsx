import { redirect } from "next/navigation";

import { UserNameForm } from "@/components/common/usernameForm";
import { authOptions, getAuthSession } from "@/lib/auth";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/sign-in");
  }

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="">
        <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
        <hr className="my-3" />
        <div className="mt-6 grid gap-10">
          <UserNameForm
            user={{
              id: session.user.id,
              username: session.user.username || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
