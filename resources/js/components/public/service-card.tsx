import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Service } from '@/types/portfolio';

/**
 * Sticky stacking service card with:
 * - position: sticky stacking (each card pins on top of previous)
 * - Scroll-driven depth effect (scale down, dim, move up when covered)
 * - Mouse-following spotlight
 * - Animated gradient border on hover
 * - 3D tilt on hover
 * - Staggered pill entrance
 * - Glowing number + giant background number
 */
export default function ServiceCard({
    service,
    index,
    total,
}: {
    service: Service;
    index: number;
    total: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Check for reduced motion preference
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Mouse position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    const spotlightX = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
    const spotlightY = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

    const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
    const rotateY = useTransform(smoothMouseX, [0, 1], [-4, 4]);

    // Scroll-driven depth effect
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    const isLast = index === total - 1;

    const scale = isLast || reducedMotion
        ? useTransform(scrollYProgress, [0, 1], [1, 1])
        : useTransform(scrollYProgress, [0.5, 1], [1, 0.95]);

    const opacity = isLast || reducedMotion
        ? useTransform(scrollYProgress, [0, 1], [1, 1])
        : useTransform(scrollYProgress, [0.5, 1], [1, 0.6]);

    const translateY = isLast || reducedMotion
        ? useTransform(scrollYProgress, [0, 1], [0, 0])
        : useTransform(scrollYProgress, [0.5, 1], [0, -20]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }

    const stickyTopDesktop = `calc(5rem + ${index * 1.5}rem)`;
    const stickyTopMobile = `calc(4rem + ${index * 0.75}rem)`;

    return (
        <div className="min-h-[92svh]">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative sticky overflow-hidden rounded-3xl bg-brand-ink shadow-[0_-8px_30px_rgba(0,0,0,0.3)]"
                style={{
                    top: `clamp(${stickyTopMobile}, ${stickyTopDesktop}, ${stickyTopDesktop})`,
                    zIndex: index + 1,
                    scale,
                    opacity,
                    y: translateY,
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    minHeight: '80svh',
                }}
            >
                {/* Giant background number — fills empty space */}
                <div className="pointer-events-none absolute -top-12 -right-8 select-none public-display text-[18rem] font-black leading-none text-brand-cream/[0.025] md:text-[26rem]">
                    {service.number}
                </div>

                {/* Giant service title watermark */}
                <div className="pointer-events-none absolute bottom-4 left-6 right-6 select-none overflow-hidden public-display text-5xl font-black uppercase leading-none tracking-tight text-brand-cream/[0.03] md:text-7xl">
                    {service.title}
                </div>

                {/* Animated gradient border */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-yellow via-brand-red to-brand-yellow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Mouse spotlight — bigger for larger card */}
                <motion.div
                    style={{
                        left: spotlightX,
                        top: spotlightY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    className="pointer-events-none absolute h-96 w-96 rounded-full bg-brand-yellow/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Inner content — taller padding for full card */}
                <div className="relative flex m-[2px] min-h-[calc(80svh-4px)] flex-col justify-between rounded-[calc(1.5rem-2px)] bg-brand-ink p-10 md:p-16">
                    {/* Top section: number + pills */}
                    <div className="flex items-start justify-between gap-6">
                        {/* Glowing number */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="relative inline-block"
                        >
                            <span className="public-display text-7xl font-black text-brand-yellow/20 md:text-9xl">
                                {service.number}
                            </span>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 public-display text-7xl font-black text-brand-yellow/40 blur-2xl md:text-9xl">
                                {service.number}
                            </span>
                        </motion.div>

                        {/* Tech stack pills */}
                        <ul className="flex max-w-sm flex-wrap justify-end gap-2">
                            {(service.items ?? []).map((item: string, itemIndex: number) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.4 + itemIndex * 0.05,
                                            duration: 0.4,
                                            ease: 'easeOut',
                                        },
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(255, 216, 77, 0.2)',
                                        borderColor: 'rgba(255, 216, 77, 0.5)',
                                        transition: { duration: 0.2 },
                                    }}
                                    className="cursor-default rounded-full border border-brand-cream/25 px-4 py-1.5 text-xs font-medium tracking-wide transition-colors md:px-5 md:py-2 md:text-sm"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom section: title + description + accent */}
                    <div className="mt-16 flex flex-col justify-end gap-8 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-16">
                        <div className="max-w-3xl">
                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="public-display text-4xl font-bold md:text-7xl"
                            >
                                {service.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35, duration: 0.6 }}
                                className="mt-6 max-w-2xl text-base leading-relaxed opacity-75 md:text-lg md:leading-8"
                            >
                                {service.description}
                            </motion.p>
                        </div>

                        {/* Decorative accent block */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex shrink-0 items-center gap-4 self-end"
                        >
                            <div className="h-24 w-[2px] bg-gradient-to-b from-brand-yellow/60 to-transparent" />
                            <div className="flex flex-col items-start gap-2">
                                <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">
                                    Service {service.number}
                                </span>
                                <span className="public-display text-2xl font-light text-brand-cream/60">
                                    {total} of {String(total).padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
