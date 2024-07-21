/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from "clsx";
import { useThemeContext } from "../context/themeContext";
import Switch from "./ui/switch";

interface Props {
  className?: string;
}

// TODO: add tests

const ThemeToggler: React.FC<Props> = ({ className }) => {
  const { currentTheme, toggleTheme } = useThemeContext();
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Switch
        id="theme-toggler"
        checked={currentTheme === "dark"}
        onClick={toggleTheme}
      />
      <label htmlFor="theme-toggler">Dark mode</label>
    </div>
  );
};

export default ThemeToggler;
