import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, TrendingUp, Target } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#2c2e31] border-b border-[#646669] sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-[#e2b714] p-2 rounded-lg">
              <Target className="w-6 h-6 text-[#323437]" />
            </div>
            <span className="text-[#e2b714] font-bold text-xl hidden sm:block">
              No Pain No Gain
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  isActive("/")
                    ? "bg-[#e2b714] text-[#323437]"
                    : "text-[#d1d0c5] hover:bg-[#646669] hover:text-[#e2b714]"
                }
              `}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/crear"
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  isActive("/crear")
                    ? "bg-[#e2b714] text-[#323437]"
                    : "text-[#d1d0c5] hover:bg-[#646669] hover:text-[#e2b714]"
                }
              `}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Crear</span>
            </Link>

            <Link
              to="/progreso"
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  isActive("/progreso")
                    ? "bg-[#e2b714] text-[#323437]"
                    : "text-[#d1d0c5] hover:bg-[#646669] hover:text-[#e2b714]"
                }
              `}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Progreso</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
