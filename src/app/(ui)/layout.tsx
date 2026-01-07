import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "./_components/footer";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Product Inventory",
  description: "Full CRUD product inventory management system.",
  icons: [{ rel: "icon", url: "/nature-product.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`antialiased`}>
      <body>
        <TRPCReactProvider>
          <NuqsAdapter>
            <div className="flex size-full h-screen min-h-190 flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NuqsAdapter>
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
