import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/70 bg-background border-t">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Ucok Inc. All rights reserved.
            </p>

            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <span>Made with</span>
              <Heart className="fill-primary text-primary size-4" />
              <span>by Ucok</span>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
