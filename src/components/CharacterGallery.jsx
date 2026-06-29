import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaSearch, FaVideo } from "react-icons/fa";

const categoryLabels = {
  all: "All",
  anime: "Anime",
  singer: "Music",
  gaming: "Gaming",
  realm: "Realm",
};

export default function CharacterGallery({
  side,
  setBackground,
  onSelectCharacter,
  accent = "sky",
}) {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [activeName, setActiveName] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch("/data/characters.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load characters");
        }
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const nextCharacters = (data.characters || []).filter(
          (character) => !side || character.side === side
        );
        setCharacters(nextCharacters);
        setLoadError("");
        onSelectCharacter?.(nextCharacters[0]);
      })
      .catch(() => {
        if (!isMounted) return;
        setLoadError("The character universe could not be loaded.");
      });

    return () => {
      isMounted = false;
    };
  }, [onSelectCharacter, side]);

  const categories = useMemo(() => {
    const available = new Set(characters.map((character) => character.category));
    return ["all", ...Object.keys(categoryLabels).filter((item) => available.has(item))];
  }, [characters]);

  const filteredCharacters = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return characters.filter((character) => {
      const matchesSearch = character.name.toLowerCase().includes(query);
      const matchesCategory = category === "all" || character.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, characters, searchTerm]);

  const handleSelect = (character) => {
    const isActive = activeName === character.name;
    setActiveName(isActive ? "" : character.name);
    onSelectCharacter?.(character);

    if (!isActive && character.background) {
      setBackground(character.background);
    }
  };

  return (
    <section className="w-full">
      <div className="mb-4 flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
            Character vault
          </p>
          <h2 className="text-xl font-black text-white">Choose your presence</h2>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label className="relative min-w-0 flex-1 lg:w-72">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45" />
            <input
              type="search"
              placeholder="Search characters"
              className="h-11 w-full rounded-lg border border-white/15 bg-black/45 pl-10 pr-4 text-sm text-white outline-none backdrop-blur-md transition placeholder:text-white/55 focus:border-white/45 focus:bg-black/60"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setActiveName("");
              }}
            />
          </label>

          <div className="flex overflow-x-auto rounded-lg border border-white/15 bg-black/40 p-1 backdrop-blur-md">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`h-9 shrink-0 rounded-md px-3 text-sm font-semibold transition ${
                  category === item
                    ? accent === "rose"
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-950/40"
                      : "bg-sky-400 text-slate-950 shadow-lg shadow-sky-950/30"
                    : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => {
                  setCategory(item);
                  setActiveName("");
                }}
              >
                {categoryLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loadError ? (
        <p className="rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-center text-sm text-white/80">
          {loadError}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {filteredCharacters.map((character, index) => {
            const isActive = activeName === character.name;

            return (
              <motion.button
                key={character.name}
                type="button"
                className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-white/15 bg-black text-left shadow-2xl shadow-black/35 outline-none transition focus-visible:ring-2 focus-visible:ring-white/80"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
                whileHover={{ y: -5 }}
                onClick={() => handleSelect(character)}
              >
                {isActive ? (
                  <video
                    src={character.video}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : character.image ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={character.video}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}

                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                )}

                <div className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/45 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white/80 backdrop-blur">
                  {categoryLabels[character.category] || character.category}
                </div>

                {!character.image && !isActive && (
                  <div className="absolute bottom-16 left-3 flex items-center gap-2 rounded-md bg-black/45 px-2 py-1 text-[11px] font-bold text-white/70 backdrop-blur">
                    <FaVideo />
                    Video scene
                  </div>
                )}

                {!isActive && (
                  <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-950 opacity-0 shadow-lg transition group-hover:opacity-100">
                    <FaPlay className="ml-0.5 text-xs" />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="text-base font-bold leading-tight text-white drop-shadow">
                    {character.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-white/70">
                    {character.role || (isActive ? "Playing clip" : "Tap to preview")}
                  </p>
                </div>
              </motion.button>
            );
          })}

          {!filteredCharacters.length && (
            <p className="col-span-full rounded-lg border border-white/15 bg-black/50 px-4 py-8 text-center text-sm text-white/75">
              No characters found.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
