"use client";

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 w-full border-b border-black/10 bg-white/85 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-dark/85">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-black text-primary">
          Omotayo Iyiola
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-md p-2 text-secondary transition-colors hover:bg-black/5 hover:text-primary dark:hover:bg-white/10"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="rounded-md p-2 md:hidden"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-dark md:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 font-semibold text-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="mt-2 inline-flex items-center gap-2 py-3 font-semibold text-secondary"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            Theme
          </button>
        </div>
      )}
    </nav>
  );
}
