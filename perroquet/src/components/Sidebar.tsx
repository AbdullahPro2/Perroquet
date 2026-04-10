import { NavLink, Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-slate-900 border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] md:relative md:w-64 md:border-t-0 md:border-r md:shadow-none md:flex md:flex-col md:shrink-0 pb-[env(safe-area-inset-bottom)] md:pb-0">
      {/* Logo - Cache sur Mobile, Visible sur PC */}
      <Link
        to="/"
        className="hidden md:flex h-20 items-center px-6 border-b border-slate-800 mb-6 hover:bg-slate-800/50 transition-colors"
      >
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-inner text-white">
          🦜
        </div>
        <h1 className="font-black text-white tracking-tight">PERROQUET</h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-row justify-around p-2 md:flex-col md:justify-start md:px-4 md:gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all md:flex-row md:justify-start md:px-4 md:py-3 ${
              isActive
                ? "text-indigo-400 md:bg-indigo-600 md:text-white md:shadow-lg"
                : "text-slate-500 hover:text-slate-300 md:hover:bg-slate-800"
            }`
          }
        >
          <span className="text-2xl mb-1 md:mb-0 md:mr-3 md:text-xl">🎙️</span>
          <span className="text-[10px] font-bold uppercase tracking-wider md:text-sm md:normal-case md:tracking-normal">
            Création
          </span>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all md:flex-row md:justify-start md:px-4 md:py-3 ${
              isActive
                ? "text-indigo-400 md:bg-indigo-600 md:text-white md:shadow-lg"
                : "text-slate-500 hover:text-slate-300 md:hover:bg-slate-800"
            }`
          }
        >
          <span className="text-2xl mb-1 md:mb-0 md:mr-3 md:text-xl">🛒</span>
          <span className="text-[10px] font-bold uppercase tracking-wider md:text-sm md:normal-case md:tracking-normal">
            Data Center
          </span>
        </NavLink>
      </div>
    </nav>
  );
};
