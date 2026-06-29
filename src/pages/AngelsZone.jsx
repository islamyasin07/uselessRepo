import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimeCharacters from "../components/Angels/Angels";
import RealmPanel from "../components/RealmPanel";
import SceneStrip from "../components/SceneStrip";

const defaultBackground = "/assets/angel.mp4";

const quotes = [
  "The soul that sees beauty may sometimes walk alone.",
  "Peace comes from within. Do not seek it without.",
  "Angels are all around us in the quiet moments.",
  "Within you is the light of a thousand suns.",
  "Let your dreams be your wings.",
];

const scenes = [
  {
    name: "Heaven Gate",
    mood: "Pure",
    video: "/assets/angel.mp4",
    description: "Soft light, wings, and a quiet sky for the calm side.",
  },
  {
    name: "Dawn Bloom",
    mood: "Hope",
    video: "/assets/dawn.mp4",
    description: "A warmer opening scene for peaceful character moments.",
  },
  {
    name: "Dream Drift",
    mood: "Float",
    video: "/assets/girl.mp4",
    description: "A cinematic glow for music and soft anime profiles.",
  },
  {
    name: "Silver Memory",
    mood: "Still",
    video: "/assets/short.mp4",
    description: "Short, bright ambience for a slower visual rhythm.",
  },
];

const realmStats = [
  { label: "Aura", value: "98" },
  { label: "Calm", value: "S+" },
  { label: "Light", value: "12K" },
];

const features = [
  {
    icon: "power",
    title: "Living Backgrounds",
    body: "Every selected soul can replace the whole world behind the interface.",
  },
  {
    icon: "focus",
    title: "Searchable Vault",
    body: "Filter by anime, music, gaming, or realm scenes without leaving the page.",
  },
  {
    icon: "quote",
    title: "Rotating Guidance",
    body: "The quote banner keeps the page moving even before a card is opened.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const backgroundFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1 } },
};

export default function AngelsZone() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(defaultBackground);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((previous) => (previous + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative min-h-screen overflow-hidden px-4 py-5 text-white sm:px-8 lg:px-10"
    >
      <div className="fixed inset-0 overflow-hidden">
        <motion.video
          key={selectedVideo}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          initial="hidden"
          animate="visible"
          variants={backgroundFade}
        >
          <source src={selectedVideo} type="video/mp4" />
        </motion.video>
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-slate-950/84 via-sky-950/18 to-slate-950/92" />

      <div className="relative z-10 mx-auto max-w-7xl pb-12 pt-20 md:pt-6">
        <header className="flex min-h-[72vh] flex-col justify-center gap-7">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-200/80">
              Angelic realm
            </p>
            <div className="mt-4 flex items-center gap-3">
              <motion.img
                src="/assets/wing-left.webp"
                alt=""
                className="h-12 w-12 -rotate-12 object-contain sm:h-16 sm:w-16"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <h1 className="text-5xl font-black tracking-normal text-white drop-shadow-2xl sm:text-7xl">
                Angel Zone
              </h1>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
              A cinematic mood universe for bright characters, music souls, and quiet dream
              scenes. Start with the atmosphere, then dive into the vault.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_0.7fr]">
            <motion.div
              key={currentQuoteIndex}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-sm font-semibold leading-6 text-white shadow-lg backdrop-blur-xl sm:text-base"
            >
              {quotes[currentQuoteIndex]}
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#scenes"
                className="rounded-lg bg-sky-300 px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-sky-950/30 transition hover:bg-sky-200"
              >
                Explore scenes
              </a>
              <a
                href="#vault"
                className="rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                Open vault
              </a>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <section id="scenes" className="scroll-mt-24">
            <SceneStrip
              accent="sky"
              scenes={scenes}
              activeScene={selectedVideo}
              onSceneChange={setSelectedVideo}
            />
          </section>

          <section id="profile" className="scroll-mt-24">
            <RealmPanel
              accent="sky"
              selectedCharacter={selectedCharacter}
              stats={realmStats}
              features={features}
            />
          </section>

          <section id="vault" className="scroll-mt-24 rounded-lg border border-white/10 bg-black/22 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5">
            <AnimeCharacters
              setBackground={setSelectedVideo}
              onSelectCharacter={setSelectedCharacter}
            />
          </section>
        </div>
      </div>
    </motion.section>
  );
}
