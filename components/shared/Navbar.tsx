"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import biddaloyLogo from "@/public/assets/logo/biddaloy_logo.png";
import { ModeToggle } from "../ui/ModeToggle";
import Button from "../customUi/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Features", href: "/features" },
    { id: 3, name: "Pricing", href: "/pricing" },
    { id: 4, name: "Contact", href: "/contact" },
    {
      id: 5,
      name: "Pages",
      href: "#",
      more: [
        { id: 1, name: "About Us", href: "/about" },
        { id: 2, name: "Blog", href: "/blog" },
      ],
    },
  ];

  return (
    <nav
      className={`bg-background sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl w-[95%] mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={biddaloyLogo}
              alt="Biddaloy Logo"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-110"
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Biddaloy</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => item.more && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium transition-colors duration-200 flex items-center gap-1.5 py-2"
                >
                  {item.name}
                  {item.more && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.more && (
                  <div
                    className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                      openDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
                  >
                    <div className="w-52 bg-background border rounded-2xl shadow-xl py-2 px-1">
                      {item.more.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          className="block px-5 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ==================== MOBILE BOTTOM SHEET ==================== */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-background z-50 md:hidden 
                       rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out
                       ${isOpen ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
              </div>

              <div className="px-6 pb-8">
                {/* Menu Items */}
                <div className="flex flex-col">
                  {navItems.map((item) => (
                    <div key={item.id} className="border-none border-b border-border last:border-none">
                      {item.more ? (
                        <div>
                          <button
                            onClick={() =>
                              setOpenDropdown(openDropdown === item.name ? null : item.name)
                            }
                            className="w-full text-left py-1 px-2 flex items-center justify-between font-medium text-lg"
                          >
                            {item.name}
                            <ChevronDown
                              size={24}
                              className={`transition-transform duration-300 ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <div
                            className={`pl-6 overflow-hidden transition-all duration-300 ${
                              openDropdown === item.name ? "max-h-48" : "max-h-0"
                            }`}
                          >
                            <div className="flex flex-col py-2">
                              {item.more.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={sub.href}
                                  className="block py-4 px-4 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-2xl transition-all"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-5 px-2 font-medium text-lg hover:bg-accent/10 rounded-2xl transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-8 space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <span className="font-medium">Theme</span>
                    <ModeToggle />
                  </div>

                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <Button className="w-full py-4 text-base">Sign In</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}