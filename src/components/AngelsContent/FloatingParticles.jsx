import { motion } from "framer-motion";

// 🪽 Generate Random Floating Particles
const generateParticles = () =>
  new Array(15).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    delay: Math.random() * 5,
    size: Math.random() * 8 + 4,
  }));

export default function FloatingParticles() {
  const particles = generateParticles();

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-50, -100, -150],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: p.delay,
          }}
          className="absolute bg-white/60 rounded-full shadow-lg"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}px`,
            top: `${p.y}px`,
          }}
        />
      ))}
    </>
  );
}
