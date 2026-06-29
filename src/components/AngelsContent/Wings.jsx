import { motion } from "framer-motion";

const textAnimation = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, type: "spring", stiffness: 100 },
  },
};

export default function Wings() {
  return (
    <motion.section initial="hidden" animate="visible" variants={textAnimation}>
      <motion.div className="flex items-center justify-center gap-3 text-white">
        <motion.img
          src="/assets/wing-left.webp"
          alt=""
          className="h-16 w-16 -rotate-12 object-contain"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.h1
          className="text-5xl font-black tracking-normal"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Angel Zone
        </motion.h1>
        <motion.img
          src="/assets/right-wing.png"
          alt=""
          className="h-16 w-16 rotate-12 object-contain"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.section>
  );
}
