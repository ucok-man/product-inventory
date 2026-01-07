import type { PropsWithChildren } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex size-full h-screen min-h-190 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
