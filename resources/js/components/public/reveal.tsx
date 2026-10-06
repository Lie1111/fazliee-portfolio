import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Splits text into words that slide up from a mask, staggered.
 */
export function MaskReveal({
    text,
    className,
    wordClassName,
    delay = 0,
    stagger = 0.06,
}: {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    stagger?: number;
}) {
    const words = text.split(' ');

    return (
        <span className={cn('inline-flex flex-wrap', className)}>
            {words.map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    className="overflow-hidden pb-[0.12em] leading-[1.05]"
                >
                    <motion.span
                        className={cn('inline-block pr-[0.24em]', wordClassName)}
                        initial={{ y: '110%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{
                            duration: 0.75,
                            delay: delay + index * stagger,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

/**
 * Fades and lifts children into view on scroll.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    y = 28,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Counts a numeric string up to its value once it scrolls into view.
 * Non-numeric values (e.g. "TOP 10") are returned untouched.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, { once: true, margin: '-15%' });
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        if (!inView) {
            return;
        }

        const match = value.match(/\d+/);

        if (!match) {
            setDisplay(value);
            return;
        }

        const target = Number.parseInt(match[0], 10);
        const duration = 900;
        const start = performance.now();

        let frame = 0;
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(value.replace(match[0], String(current)));

            if (progress < 1) {
                frame = window.requestAnimationFrame(tick);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frame);
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}
