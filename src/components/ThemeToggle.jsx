import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className = "" }) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detectar tema inicial del navegador o localStorage
    const initializeTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      
      if (storedTheme) {
        // Si hay un tema guardado, usar ese
        if (storedTheme === "dark") {
          setIsDarkMode(true);
          document.documentElement.classList.add("dark");
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Si no hay tema guardado, detectar preferencia del navegador
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          setIsDarkMode(true);
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
    };

    initializeTheme();

    // Escuchar cambios en la preferencia del navegador
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Solo cambiar automáticamente si no hay preferencia guardada
      const storedTheme = localStorage.getItem("theme");
      if (!storedTheme) {
        if (e.matches) {
          setIsDarkMode(true);
          document.documentElement.classList.add("dark");
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-300 hover:bg-primary/10",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      aria-label={isDarkMode ? t("theme.switchToLight") : t("theme.switchToDark")}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600" />
      )}
    </button>
  );
};
