import UserAuthForm from "@/components/auth/userAuthForm";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 bg-card sm:w-[400px]">
      <div className="flex flex-col items-center space-y-2 text-center">
        <Image src="/logo.svg" alt="Hive logo" width={48} height={48} />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a Hive account and agree to our User
          Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to Hive?{" "}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
