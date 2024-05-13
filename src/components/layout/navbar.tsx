import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/common/userAccountNav";
import SearchBar from "@/components/common/searchBar";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit  bg-background py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center justify-center font-Chillax text-2xl font-semibold tracking-wide"
        >
          <Image src="/logo.svg" alt="Hive logo" width={48} height={48} />
          <p className="text-2xl text-secondary-foreground">Hive</p>
        </Link>

        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
