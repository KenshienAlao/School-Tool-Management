import { Mail } from "lucide-react";

export function Email({ email, setEmail, loading }) {
  return (
    <div className="space-y-2">
      <label
        className="text-text-secondary px-1 text-xs font-bold tracking-wider uppercase"
        htmlFor="email"
      >
        Email Address
      </label>
      <div className="group relative">
        <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
          <Mail className="h-5 w-5" />
        </div>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:ring-4"
          required
          disabled={loading}
        />
      </div>
    </div>
  );
}
