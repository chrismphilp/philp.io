import { motion } from 'framer-motion';

const HandWave = () => (
  <motion.div
    className="inline-block pl-1"
    animate={{ rotate: 20 }}
    transition={{
      from: 0,
      duration: 0.75,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
    👋
  </motion.div>
);

export default HandWave;
