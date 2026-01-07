"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] flex-col">
      <MaxWidthWrapper className="flex flex-1 items-center justify-center py-12">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="bg-primary/10 mb-6 rounded-full p-4">
            <FileSearch className="text-primary size-12" />
          </div>

          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight">
            Page not found
          </h1>

          <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Please check the URL or return to the homepage.
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1" variant="default">
              <Link href="/">Go to homepage</Link>
            </Button>
            <Button
              onClick={() => router.back()}
              className="flex-1"
              variant="outline"
            >
              Go back
            </Button>
          </div>

          <div className="from-muted to-border mt-8 h-1 w-16 rounded-full bg-linear-to-r" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
