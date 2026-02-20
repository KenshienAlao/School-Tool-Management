// ui
import { OnViewMenu } from "@/app/components/ui/onViewMenu";

export function Sidebar({ activeView, handleLogout }) {
  return (
    <aside className="w-64 bg-gray-50 border-r-2 flex flex-col min-h-screen">
      <div className="p-6 border-b-2">
        <h2 className="text-xl font-bold">School Tool</h2>
      </div>

      <div className="flex-1">
        <OnViewMenu activeView={activeView} />
      </div>

      <div className="p-4 border-t-2">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
