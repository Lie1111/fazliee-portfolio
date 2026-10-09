import { AnimatePresence, motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Forest-green colour-wipe page transition. A panel sweeps up to cover the page
 * on navigation start, then sweeps away on finish.
 */
export default function PageTransition() {
    const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let revealTimer = 0;

        const offStart = router.on('start', () => {
            window.clearTimeout(revealTimer);
            setPhase('cover');
        });

        const offFinish = router.on('finish', () => {
            setPhase('reveal');
            revealTimer = window.setTimeout(() => setPhase('idle'), 650);
        });

        return () => {
            window.clearTimeout(revealTimer);
            offStart();
            offFinish();
        };
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'idle' && (
                <motion.div
                    key="wipe"
                    className="pointer-events-none fixed inset-0 z-[150] bg-forest"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
                    exit={{ scaleY: 0 }}
                    style={{ originY: phase === 'cover' ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                />
            )}
        </AnimatePresence>
    );
}
