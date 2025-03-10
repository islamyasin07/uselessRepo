import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export default function ThemeSwitcher({ onThemeChange }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", enabled);
    onThemeChange(enabled ? "evil" : "good");
  }, [enabled, onThemeChange]);

  return (
    <div className="flex items-center justify-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-black" : "bg-yellow-400"
        } relative inline-flex h-10 w-20 items-center rounded-full transition duration-300 shadow-lg`}
      >
        <span
          className={`${
            enabled ? "translate-x-10 bg-white" : "translate-x-0 bg-yellow-600"
          } inline-block h-9 w-9 transform rounded-full transition duration-300`}
        />
      </Switch>
    </div>
  );
}
