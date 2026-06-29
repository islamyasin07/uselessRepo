import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EvilsCharacters from "../components/Evils/Evils";
import RealmPanel from "../components/RealmPanel";
import SceneStrip from "../components/SceneStrip";

const quotes = [
  "In darkness, we find clarity.",
  "I did not come to play fair. I came to win.",
  "Welcome to the abyss that stares back.",
  "If I go down, I take the whole kingdom with me.",
  "Mercy is a currency I never carry.",
];

const scenes = [
  {
    name: "Inferno Gate",
    mood: "Heat",
    video: "/assets/Evil.mp4",
    description: "The original hellscape for the villain side.",
  },
  {
    name: "Midnight Crown",
    mood: "Void",
    video: "/assets/midnight.mp4",
    description: "A darker, colder scene with a cinematic pulse.",
  },
  {
    name: "Ash Ritual",
    mood: "Chaos",
    video: "/assets/Clip.mp4",
    description: "Sharp motion for intense cards and monster profiles.",
  },
  {
    name: "Crimson Echo",
    mood: "Rage",
    video: "/assets/clip2.mp4",
    description: "A restless backdrop for the most dangerous selections.",
  },
];

const realmStats = [
  { label: "Fear", value: "99" },
  { label: "Chaos", value: "S+" },
  { label: "Fire", value: "13K" },
];

const features = [
  {
    icon: "power",
    title: "Villain Profiles",
    body: "Each selection reveals a stronger identity panel instead of just swapping clips.",
  },
  {
    icon: "cinema",
    title: "Scene Control",
    body: "Switch the entire hell atmosphere from inferno to midnight without leaving the page.",
  },
  {
    icon: "star",
    title: "Darker Collection",
    body: "The evil side has added characters, mood scenes, and stronger visual hierarchy.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function EvilsHell() {
  const [selectedVideo, setSelectedVideo] = useState("/assets/Evil.mp4");
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((previous) => (previous + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-5 text-white sm:px-8 lg:px-10">
      <div className="fixed inset-0 overflow-hidden">
        <video
          key={selectedVideo}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-red-950/30 to-black/92" />

      <div className="relative z-10 mx-auto max-w-7xl pb-12 pt-20 md:pt-6">
        <header className="flex min-h-[72vh] flex-col justify-center gap-7">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-rose-300/85">
              Villain realm
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-normal text-white drop-shadow-2xl sm:text-7xl">
              Evil Hell
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              A darker cinematic mood universe for monsters, antiheroes, heavy scenes, and
              powerful villain profiles.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_0.7fr]">
            <motion.div
              key={currentQuoteIndex}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="rounded-lg border border-red-200/20 bg-black/45 px-5 py-4 text-sm font-semibold leading-6 text-white shadow-lg shadow-red-950/20 backdrop-blur-xl sm:text-base"
            >
              {quotes[currentQuoteIndex]}
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#scenes"
                className="rounded-lg bg-rose-500 px-5 py-3 text-sm font-black text-white shadow-xl shadow-rose-950/30 transition hover:bg-rose-400"
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
              accent="rose"
              scenes={scenes}
              activeScene={selectedVideo}
              onSceneChange={setSelectedVideo}
            />
          </section>

          <section id="profile" className="scroll-mt-24">
            <RealmPanel
              accent="rose"
              selectedCharacter={selectedCharacter}
              stats={realmStats}
              features={features}
            />
          </section>

          <section id="vault" className="scroll-mt-24 rounded-lg border border-white/10 bg-black/26 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5">
            <EvilsCharacters
              setBackground={setSelectedVideo}
              onSelectCharacter={setSelectedCharacter}
            />
          </section>
        </div>
      </div>
    </section>
  );
}
