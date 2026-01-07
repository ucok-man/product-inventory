import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Product Inventory",
  description: "Full CRUD product inventory management system.",
  icons: [{ rel: "icon", url: "/nature-product.svg" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`antialiased`}>
      <body>
        <TRPCReactProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster
            toastOptions={{
              classNames: {
                description: "text-muted-foreground!",
              },
            }}
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
