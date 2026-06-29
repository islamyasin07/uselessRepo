import { motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";

export default function SceneStrip({ accent = "sky", scenes, activeScene, onSceneChange }) {
  const activeClass =
    accent === "rose"
      ? "border-rose-300/45 bg-rose-500/20 text-white"
      : "border-sky-200/45 bg-sky-400/20 text-white";

  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
            Cinematic scenes
          </p>
          <h2 className="text-xl font-black text-white">Change the atmosphere</h2>
        </div>
        <FaVideo className="hidden text-white/35 sm:block" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {scenes.map((scene, index) => {
          const isActive = activeScene === scene.video;

          return (
            <motion.button
              key={scene.name}
              type="button"
              className={`relative min-h-24 overflow-hidden rounded-lg border p-4 text-left shadow-xl shadow-black/25 transition ${
                isActive
                  ? activeClass
                  : "border-white/10 bg-black/35 text-white/75 hover:border-white/30 hover:bg-white/10"
              }`}
              onClick={() => onSceneChange(scene.video)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-white/45">
                {scene.mood}
              </span>
              <h3 className="mt-2 text-base font-black text-white">{scene.name}</h3>
              <p className="mt-1 text-xs leading-5 text-white/62">{scene.description}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
