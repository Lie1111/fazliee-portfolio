import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const LERP = 0.1;

/**
 * Custom cursor: a small dot with a trailing ring that grows into a labelled
 * circle when hovering elements carrying a `data-cursor="Label"` attribute.
 *
 * The native cursor is hidden from JS (via the `public-custom-cursor` class on
 * <html>) only once this component is actually mounted, so the pointer can
 * never disappear. The overlay is visible immediately — it does not wait for a
 * `mouseenter` event, which never fires when the page loads with the pointer
 * already inside the viewport.
 */
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const [enabled, setEnabled] = useState(false);
    const [label, setLabel] = useState<string | null>(null);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia(
            '(hover: none), (pointer: coarse)',
        ).matches;

        // Touch devices keep their native pointer.
        if (isTouch) {
            return;
        }

        setEnabled(true);
        document.documentElement.classList.add('public-custom-cursor');

        return () => {
            document.documentElement.classList.remove('public-custom-cursor');
        };
    }, []);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const instant = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        const ease = instant ? 1 : LERP;

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ring = { x: target.x, y: target.y };
        const dot = { x: target.x, y: target.y };
        let frame = 0;

        const onMove = (event: MouseEvent) => {
            target.x = event.clientX;
            target.y = event.clientY;
        };

        const onOver = (event: MouseEvent) => {
            const el = (
                event.target as HTMLElement | null
            )?.closest<HTMLElement>('[data-cursor]');

            if (el) {
                setLabel(el.dataset.cursor ?? '');
                setHovering(true);
                return;
            }

            const interactive = (event.target as HTMLElement | null)?.closest(
                'a, button, [role="button"]',
            );
            setHovering(Boolean(interactive));
            setLabel(null);
        };

        const onLeave = () => {
            if (dotRef.current) {
                dotRef.current.style.opacity = '0';
            }
            if (ringRef.current) {
                ringRef.current.style.opacity = '0';
            }
        };

        const onEnter = () => {
            if (dotRef.current) {
                dotRef.current.style.opacity = '1';
            }
            if (ringRef.current) {
                ringRef.current.style.opacity = '1';
            }
        };

        const loop = () => {
            dot.x += (target.x - dot.x) * ease * 1.6;
            dot.y += (target.y - dot.y) * ease * 1.6;
            ring.x += (target.x - ring.x) * ease;
            ring.y += (target.y - ring.y) * ease;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
            }

            frame = window.requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        frame = window.requestAnimationFrame(loop);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden
                className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200"
            />
            <div
                ref={ringRef}
                aria-hidden
                className={cn(
                    'pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full text-center text-xs font-semibold transition-[width,height,background-color,color] duration-300',
                    // Only labelled targets get the big filled bubble; plain
                    // links just get a slightly larger ring so text stays readable.
                    label
                        ? 'size-20 border-2 border-ink bg-peach text-ink'
                        : hovering
                          ? 'size-12 border-2 border-white bg-transparent text-transparent mix-blend-difference'
                          : 'size-9 border border-white/80 bg-transparent text-transparent mix-blend-difference',
                )}
            >
                {label}
            </div>
        </>
    );
}
