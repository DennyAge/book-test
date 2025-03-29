"use client";
//core
import { useEffect, useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";
import { useRouter } from "@/i18n/navigation";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light");

  const router = useRouter();

  useEffect(() => {
    const savedTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    setTheme(newTheme);
    router.refresh();
  };

  return (
    <button
      className="p-2 border dark:bg-input/30 border-input rounded cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <GoSun /> : <GoMoon />}
    </button>
  );
};
export default ThemeSwitch;
