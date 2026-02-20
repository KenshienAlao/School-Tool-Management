import Link from "next/link";
import { menu } from "@/app/data/menuLink";

export function OnViewMenu({ activeView = "info" }) {
  return (
    <div className="h-full p-4">
      <div className="flex flex-col space-y-2">
        {menu.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              activeView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
