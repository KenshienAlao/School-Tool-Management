import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <div className="border-surface-muted bg-surface-muted/30 border-t p-6 text-center">
      <p className="text-text-secondary text-sm font-medium">
        New to the platform?{" "}
        <Link
          href="/page/register"
          className="group text-brand-primary hover:text-brand-secondary inline-flex items-center gap-1 font-bold transition-colors"
        >
          Create Account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </p>
    </div>
  );
}
