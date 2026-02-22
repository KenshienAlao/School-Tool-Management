import Link from "next/link";
import { menu } from "@/app/data/menuLink";

export function OnViewMenu({ activeView = "home" }) {
  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-5">
        {menu.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className={`flex items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors ${
              activeView === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100/5"
            }`}
          >
            <p className="text-xl">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function OnViewMenuIcon({ activeView = "home" }) {
  return (
    <div className="size-full p-4">
      <div className="flex flex-col gap-5">
        {menu.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className={`flex items-center justify-center rounded-lg py-1 transition-colors ${
              activeView === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100/5"
            }`}
          >
            <item.icon size={35} />
          </Link>
        ))}
      </div>
    </div>
  );
}
