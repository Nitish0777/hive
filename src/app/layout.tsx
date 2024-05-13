import Navbar from "@/components/layout/navbar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive",
  description: "Community-driven, open-source, decentralized social network",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "light bg-background text-primary antialiased",
        inter.className,
      )}
    >
      <body className="min-h-screen bg-background pt-12 font-Satoshi antialiased">
        <Providers>
          <Navbar />
          {authModal}

          <div className="container mx-auto h-full max-w-7xl pt-12">
            {children}
            <div className="fixed bottom-4 right-4">
              <ModeToggle />
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
