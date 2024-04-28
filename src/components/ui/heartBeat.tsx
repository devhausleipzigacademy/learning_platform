'use client';

import useRandomInterval from '@/lib/hooks/useRandomInterval';
import { ArrayOf } from '@/lib/typing';
import { motion } from 'framer-motion';
import { useState } from 'react';

type HeartBeatProps = {
  children: React.ReactNode;
  scale?: number;
  delay?: ArrayOf<'exactly', 2, number>;
  duration?: number;
};

/**
 *
 * @param scale - Number greater than 1
 * @param delay - Tuple of min and max delay; units of seconds
 * @param duration - Number; units of seconds
 * @param duration - Number; units of seconds
 * @returns
 */
export default function HeartBeat({
  children,
  scale = 1.4,
  delay = [0.4, 1],
  duration = 0.4
}: HeartBeatProps) {
  const [key, setKey] = useState<number | null>(null);

  // To re-trigger the animation, we need to unmount and remount
  // the element. We'll do that by dynamically changing its
  // "key" prop, telling React that it needs to recreate it.
  useRandomInterval(
    () => setKey(Math.random()),
    delay[0] * 1000,
    delay[1] * 1000
  );

  return (
    <>
      <motion.div
        animate={{
          scale: [1, scale, 1],
          rotate: [0, Math.round(Math.random()) * -1 * 5, 0],
          transition: { duration, times: [0, 0.4, 1] }
        }}
        key={key}
      >
        {children}
      </motion.div>
    </>
  );
}
