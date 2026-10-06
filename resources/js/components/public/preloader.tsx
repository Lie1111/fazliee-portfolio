import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { characterImage } from '@/lib/character';

const SESSION_KEY = 'fazliee-preloaded';

/**
 * Preloader: counts 0–100% while the character peeks in, then lifts a curtain
 * to reveal the page. Only runs once per browser session.
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

        const duration = 1500;
        const start = performance.now();
        let frame = 0;
        let timeout = 0;

        const tick = (now: number) => {
            const progressRatio = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progressRatio, 2);
            setProgress(Math.round(eased * 100));

            if (progressRatio < 1) {
                frame = window.requestAnimationFrame(tick);
            } else {
                timeout = window.setTimeout(() => {
                    sessionStorage.setItem(SESSION_KEY, '1');
                    setDone(true);
                }, 300);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-end bg-brand-red text-brand-cream"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    <motion.img
                        src={characterImage('idle')}
                        alt=""
                        aria-hidden
                        draggable={false}
                        className="pointer-events-none w-56 translate-y-8 md:w-72"
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 8, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-xs tracking-[0.25em] uppercase md:p-10">
                        <span>Fazliee Aiman</span>
                        <span>Loading</span>
                    </div>
                    <span className="public-display pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] leading-none tabular-nums opacity-90">
                        {progress}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
