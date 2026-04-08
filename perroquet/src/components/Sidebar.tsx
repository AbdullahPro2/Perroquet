import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <nav className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 shadow-2xl z-20">
      <div className="h-20 flex items-center px-6 border-b border-slate-800 mb-6 bg-slate-950">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-inner text-white">
          🦜
        </div>
        <h1 className="font-black text-white tracking-tight">PERROQUET</h1>
      </div>

      <div className="flex flex-col gap-2 px-4 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? "bg-indigo-600 text-white shadow-lg" : "hover:bg-slate-800"}`
          }
        >
          🎙️ Création
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? "bg-indigo-600 text-white shadow-lg" : "hover:bg-slate-800"}`
          }
        >
          🛒 Data Center
        </NavLink>
      </div>
    </nav>
  );
};
