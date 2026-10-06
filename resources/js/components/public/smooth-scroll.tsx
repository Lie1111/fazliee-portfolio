import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Mounts Lenis inertia scrolling for the public site and cleans it up on
 * unmount. Respects `prefers-reduced-motion`.
 */
export default function SmoothScroll() {
    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (prefersReduced) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = window.requestAnimationFrame(raf);
        };
        frame = window.requestAnimationFrame(raf);

        return () => {
            window.cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);

    return null;
}
