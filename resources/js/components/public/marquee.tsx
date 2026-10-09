import {
    motion,
    useScroll,
    useVelocity,
    useSpring,
    useTransform,
} from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Infinite marquee strip. The skew reacts to scroll velocity so it feels
 * connected to the page. Pauses for reduced-motion visitors via CSS.
 */
export default function Marquee({
    items,
    separator = '✦',
    className,
    itemClassName,
}: {
    items: ReactNode[];
    separator?: ReactNode;
    className?: string;
    itemClassName?: string;
}) {
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smooth = useSpring(velocity, { damping: 40, stiffness: 300 });
    const skew = useTransform(smooth, [-1500, 0, 1500], [-4, 0, 4], {
        clamp: true,
    });

    const row = (
        <div className="flex shrink-0 items-center">
            {items.map((item, index) => (
                <span
                    key={index}
                    className={cn('flex items-center', itemClassName)}
                >
                    <span className="px-6">{item}</span>
                    <span aria-hidden className="text-peach">
                        {separator}
                    </span>
                </span>
            ))}
        </div>
    );

    return (
        <div className={cn('relative overflow-hidden py-6', className)}>
            <motion.div style={{ skewX: skew }} className="flex w-max">
                <div className="public-marquee-track flex w-max [animation:public-marquee_40s_linear_infinite]">
                    {row}
                    {row}
                </div>
            </motion.div>
        </div>
    );
}
