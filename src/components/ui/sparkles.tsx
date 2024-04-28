import { rangeRandom } from '@/lib/math';
import { HTMLAttributes, useState } from 'react';
import range from 'just-range';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';
import useRandomInterval from '@/lib/hooks/useRandomInterval';
import { motion } from 'framer-motion';

const DEFAULT_COLOR = '#FFC700';

const generateSparkle = (color: string) => {
  const sparkle = {
    id: String(rangeRandom(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: rangeRandom(10, 20),
    style: {
      top: rangeRandom(0, 100) + '%',
      left: rangeRandom(0, 100) + '%',
      zIndex: Math.round(Math.random())
    }
  };
  return sparkle;
};

type SparklesProps = {
  color?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * @description React component to create an accessibility-compliant strong tag with sparkle animations.
 * @see https://www.joshwcomeau.com/react/animated-sparkles-in-react/
 */
function Sparkles({
  color = DEFAULT_COLOR,
  children,
  ...delegated
}: SparklesProps) {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color));
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  );

  return (
    <span className="relative inline-block" {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          prefersReducedMotion={prefersReducedMotion}
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative font-bold">{children}</strong>
    </span>
  );
}

type SparkleProps = {
  prefersReducedMotion: boolean;
  size: number;
  color: string;
  style: React.CSSProperties;
};

function Sparkle({ size, color, style, prefersReducedMotion }: SparkleProps) {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

  return (
    <motion.span
      suppressHydrationWarning
      className="absolute block"
      style={style}
      animate={{ scale: !prefersReducedMotion ? [0, 1, 0] : undefined }}
    >
      <motion.svg
        animate={{ rotate: !prefersReducedMotion ? [0, 180] : undefined }}
        className="block"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </motion.svg>
    </motion.span>
  );
}

export default Sparkles;
