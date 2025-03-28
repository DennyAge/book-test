"use client";

//core
import { GoMoon, GoSun } from "react-icons/go";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="p-2 border dark:bg-input/30 border-input rounded cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <GoSun /> : <GoMoon />}
    </button>
  );
};
export default ThemeSwitch;
