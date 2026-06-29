import { FaGem, FaHome, FaMoon, FaMusic, FaSun } from "react-icons/fa";
import AngelMusic from "./AngelsContent/AngelMusic";

const themes = [
  {
    id: "good",
    label: "Angel Zone",
    shortLabel: "Angel",
    icon: FaSun,
    swatch: "bg-sky-300",
    description: "Light, calm, wings",
  },
  {
    id: "evil",
    label: "Evil Hell",
    shortLabel: "Evil",
    icon: FaMoon,
    swatch: "bg-rose-500",
    description: "Fire, chaos, void",
  },
];

const sectionLinks = [
  { href: "#scenes", label: "Scenes" },
  { href: "#profile", label: "Profile" },
  { href: "#vault", label: "Vault" },
];

export default function Sidebar({ selectedTheme, onThemeChange }) {
  return (
    <aside className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 px-4 py-3 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150 md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-b-0 md:border-r md:bg-black/24 md:px-5 md:py-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/[0.03]" />
      <div className="relative flex h-full items-center justify-between gap-4 md:flex-col md:items-stretch">
        <div className="flex items-center gap-3 md:block">
          <div className="hidden md:block">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 shadow-lg">
              <FaGem className="text-sky-200" />
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-normal">Useless</h2>
            <p className="mt-1 text-sm leading-5 text-white/55">Interactive mood universe</p>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:bg-white/20 md:mt-7 md:w-full md:grid-cols-[auto_1fr] md:gap-3 md:px-3"
            aria-label="Home"
          >
            <FaHome />
            <span className="hidden text-left text-sm font-bold md:block">Home</span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:mt-7 md:flex-col md:items-stretch">
          <div className="hidden items-center gap-2 text-xs font-black uppercase tracking-wide text-white/45 md:flex">
            <FaMusic />
            Realms
          </div>

          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                className={`flex h-11 min-w-11 items-center justify-center gap-3 rounded-lg border px-3 text-sm font-bold transition md:h-auto md:justify-between md:py-3 ${
                  isSelected
                    ? "border-white/35 bg-white/20 text-white shadow-lg shadow-black/25"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => onThemeChange(theme.id)}
                aria-pressed={isSelected}
                title={theme.label}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="shrink-0" />
                  <span className="hidden min-w-0 text-left md:block">
                    <span className="block truncate">{theme.label}</span>
                    <span className="block truncate text-xs font-medium text-white/45">
                      {theme.description}
                    </span>
                  </span>
                  <span className="md:hidden">{theme.shortLabel}</span>
                </span>
                <span className={`hidden h-7 w-7 shrink-0 rounded-full ${theme.swatch} md:block`} />
              </button>
            );
          })}
        </div>

        <nav className="hidden md:mt-7 md:block" aria-label="Page sections">
          <p className="text-xs font-black uppercase tracking-wide text-white/45">Sections</p>
          <div className="mt-3 grid gap-2">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-white/65 transition hover:bg-white/12 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hidden md:mt-auto md:block">
          <AngelMusic />
        </div>
      </div>
    </aside>
  );
}
