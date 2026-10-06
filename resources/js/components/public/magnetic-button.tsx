import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wraps content in a magnetic hover effect: the element leans towards the
 * cursor and springs back on leave. Disabled for reduced-motion visitors.
 */
export default function MagneticButton({
    children,
    className,
    strength = 0.35,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);

    const onMove = (event: MouseEvent<HTMLSpanElement>) => {
        const el = ref.current;
        if (!el) {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * strength;
        const y = (event.clientY - rect.top - rect.height / 2) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onLeave = () => {
        const el = ref.current;
        if (el) {
            el.style.transform = 'translate3d(0, 0, 0)';
        }
    };

    return (
        <span
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={cn(
                'inline-block transition-transform duration-300 ease-out will-change-transform',
                className,
            )}
        >
            {children}
        </span>
    );
}
