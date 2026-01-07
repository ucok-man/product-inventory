"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] flex-col">
      <MaxWidthWrapper className="flex flex-1 items-center justify-center py-12">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="bg-destructive/10 mb-6 rounded-full p-4">
            <AlertCircle className="text-destructive size-12" />
          </div>

          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>

          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            We encountered an error while loading this page. Don&apos;t worry,
            it&apos;s not your fault. Please try again.
          </p>

          {error?.digest && (
            <p className="text-muted-foreground bg-muted mb-6 rounded-md px-3 py-2 font-mono text-xs">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button onClick={reset} className="flex-1" variant="default">
              Try again
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="flex-1"
              variant="outline"
            >
              Go to homepage
            </Button>
          </div>

          <div className="from-muted to-border mt-8 h-1 w-16 rounded-full bg-linear-to-r" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
