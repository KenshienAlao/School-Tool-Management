import Link from "next/link";
import { Lock } from "lucide-react";

export function Password({ password, setPassword, loading }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label  
          className="text-text-secondary text-xs font-bold tracking-wider uppercase"
          htmlFor="password"
        >
          Password
        </label>
        <Link
          href="#"
          className="text-brand-primary text-xs font-bold hover:underline"
        >
          Forgot?
        </Link>
      </div>
      <div className="group relative">
        <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
          <Lock className="h-5 w-5" />
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:ring-4"
          required
          disabled={loading}
        />
      </div>
    </div>
  );
}
