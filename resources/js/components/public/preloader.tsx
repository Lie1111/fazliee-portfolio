import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AVATAR_SRC } from '@/components/public/avatar';

const SESSION_KEY = 'fazliee-preloaded';

/**
 * Preloader: the avatar's circle fills like a progress ring while the image
 * loads, then the curtain lifts. Only runs once per browser session.
 */
export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === '1') {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            sessionStorage.setItem(SESSION_KEY, '1');
            return;
        }

        setDone(false);

        const duration = 1300;
        const start = performance.now();
        let frame = 0;
        let timeout = 0;

        const tick = (now: number) => {
            const ratio = Math.min((now - start) / duration, 1);
            setProgress(1 - Math.pow(1 - ratio, 3));

            if (ratio < 1) {
                frame = window.requestAnimationFrame(tick);
            } else {
                timeout = window.setTimeout(() => {
                    sessionStorage.setItem(SESSION_KEY, '1');
                    setDone(true);
                }, 250);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timeout);
        };
    }, []);

    const circumference = 2 * Math.PI * 47;

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-forest text-paper"
                    initial={{ clipPath: 'inset(0 0 0 0)' }}
                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="relative size-40 md:size-48">
                        <svg
                            viewBox="0 0 100 100"
                            className="absolute inset-0 -rotate-90"
                            aria-hidden
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="47"
                                fill="none"
                                stroke="currentColor"
                                strokeOpacity="0.15"
                                strokeWidth="2"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="47"
                                fill="none"
                                stroke="var(--color-peach)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={
                                    circumference * (1 - progress)
                                }
                            />
                        </svg>
                        <img
                            src={AVATAR_SRC}
                            alt=""
                            aria-hidden
                            draggable={false}
                            className="absolute inset-[7%] size-[86%] rounded-full object-cover"
                        />
                    </div>
                    <p className="public-display text-2xl">
                        Fazliee Aiman
                        <span className="ml-3 font-sans text-sm font-normal tracking-normal tabular-nums opacity-60">
                            {Math.round(progress * 100)}%
                        </span>
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
