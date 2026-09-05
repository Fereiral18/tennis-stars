import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative z-10">
            <Sidebar
              onClose={() =>
                setIsSidebarOpen(false)
              }
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
        />

        <main className="flex-1 bg-[var(--tt-bg-surface)]">
          <div className="mx-auto max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}