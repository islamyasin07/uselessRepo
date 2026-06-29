import { motion } from "framer-motion";
import { FaBolt, FaCompass, FaFilm, FaQuoteLeft, FaStar } from "react-icons/fa";

const iconMap = {
  power: FaBolt,
  focus: FaCompass,
  cinema: FaFilm,
  quote: FaQuoteLeft,
  star: FaStar,
};

export default function RealmPanel({ accent = "sky", selectedCharacter, stats, features }) {
  const accentClasses =
    accent === "rose"
      ? {
          border: "border-rose-300/20",
          glow: "shadow-rose-950/25",
          text: "text-rose-200",
          pill: "bg-rose-500/20 text-rose-100",
        }
      : {
          border: "border-sky-200/20",
          glow: "shadow-sky-950/25",
          text: "text-sky-100",
          pill: "bg-sky-400/20 text-sky-50",
        };

  return (
    <div className="grid w-full gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <motion.section
        className={`rounded-lg border ${accentClasses.border} bg-black/38 p-4 shadow-2xl ${accentClasses.glow} backdrop-blur-xl`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.24em] ${accentClasses.text}`}>
              Featured soul
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {selectedCharacter?.name || "Choose a character"}
            </h2>
          </div>
          <span className={`rounded-md px-3 py-1 text-xs font-bold ${accentClasses.pill}`}>
            {selectedCharacter?.category || "realm"}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-white/70">
          {selectedCharacter?.bio ||
            "Tap any card to preview its clip, shift the world background, and reveal the character profile."}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(selectedCharacter?.stats || stats).map((item) => (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.07] p-3">
              <p className="text-2xl font-black text-white">{item.value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white/45">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="grid gap-3 sm:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon] || FaStar;

          return (
            <motion.div
              key={feature.title}
              className="rounded-lg border border-white/10 bg-black/32 p-4 shadow-xl shadow-black/20 backdrop-blur-xl"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                <Icon />
              </div>
              <h3 className="text-sm font-black text-white">{feature.title}</h3>
              <p className="mt-1 text-xs leading-5 text-white/62">{feature.body}</p>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
