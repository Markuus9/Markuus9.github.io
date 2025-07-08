import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Marc</span>{" "}
            <span className="text-primary">Gómez</span>
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-3 ml-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* mobile nav */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-[110] relative bg-background/50 rounded-lg backdrop-blur-sm"
            aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-lg z-[100] flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden min-h-screen",
            isMenuOpen
              ? "opacity-98 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-10 text-2xl text-center w-full max-w-sm">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 py-4 px-8 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
