import React, { useState } from "react";
import {
  Zap,
  Home,
  Users,
  Settings,
  Bell,
  Calendar,
  Mail,
  MessageCircle,
  Activity,
  PieChart,
  BarChart2,
  ChevronRight,
  Search,
  LogOut,
} from "lucide-react";

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home },
  { id: 2, label: "Users", icon: Users, count: 12 },
  { id: 3, label: "Notifications", icon: Bell, badge: 3 },
  { id: 4, label: "Reports", icon: BarChart2 },
  { id: 5, label: "Calendar", icon: Calendar },
  { id: 6, label: "Messages", icon: Mail, badge: 5 },
  { id: 7, label: "Chat", icon: MessageCircle, count: 8 },
  { id: 8, label: "Activity", icon: Activity },
  { id: 9, label: "Analytics", icon: PieChart },
  {
    id: 10,
    label: "Settings",
    icon: Settings,
    submenu: true,
    items: ["Profile", "Security", "System"],
  },
];

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [openSub, setOpenSub] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-80"
      } shrink-0 transition-all duration-500 ease-out
      bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
      flex flex-col relative overflow-hidden`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"></div>

      {/* Logo Section */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-slate-950" />
              </div>
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  NEXUS
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wider">
                  CONTROL CENTER
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div className="mt-6">
            <div
              className={`relative transition-all duration-300 ${
                searchFocus ? "scale-105" : ""
              }`}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800/70 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentPage === item.label;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setOpenSub(openSub === item.id ? null : item.id);
                  } else {
                    onPageChange(item.label);
                  }
                }}
                className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg 
                transition-all duration-300 relative overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
                    : "hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-r"></div>
                )}

                {/* Left: icon + label */}
                <div className="flex items-center space-x-3 relative z-10">
                  <div
                    className={`p-1.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg"
                        : "bg-slate-800 group-hover:bg-slate-700"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        isActive ? "text-slate-950" : "text-slate-400"
                      }`}
                    />
                  </div>

                  {!collapsed && (
                    <span
                      className={`font-semibold text-sm ${
                        isActive
                          ? "text-emerald-400"
                          : "text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Right side */}
                {!collapsed && (
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg">
                        {item.badge}
                      </span>
                    )}

                    {item.count && (
                      <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                        {item.count}
                      </span>
                    )}

                    {item.submenu && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform text-slate-500 ${
                          openSub === item.id ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && openSub === item.id && !collapsed && (
                <div className="ml-12 mt-1 space-y-1 border-l-2 border-slate-800 pl-4">
                  {item.items.map((sub, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-sm py-2 px-3 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50 transition-all"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="relative z-10 p-4 border-t border-slate-800/50">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/30 transition-all group cursor-pointer`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-md opacity-50"></div>
              <img
                src="https://i.pravatar.cc/300"
                alt="User"
                className="relative w-10 h-10 rounded-full ring-2 ring-emerald-500/50"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-900"></div>
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-200 truncate">
                  Danushan
                </p>
                <p className="text-xs text-slate-500 truncate">Administrator</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;