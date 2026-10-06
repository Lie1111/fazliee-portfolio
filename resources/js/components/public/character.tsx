import { useEffect, useMemo, useRef, useState } from 'react';
import { characterImage } from '@/lib/character';
import type { CharacterExpression } from '@/lib/character';
import { cn } from '@/lib/utils';

const LERP = 0.1;

/**
 * The stylised 3D character. It floats gently and its head follows the cursor,
 * then gives a small "boing" when clicked.
 *
 * A controlled `expression` prop swaps the artwork — used by the 404 page
 * (confused) and the contact form success state (thumbs up). Idle never swaps
 * frames, because the placeholder artwork is generated per-prompt (each state is
 * a different render) and cross-fading between them reads as a flicker.
 */
export default function Character({
    className,
    expression: controlled,
    follow = true,
    onClickWink = true,
    alt = 'Fazliee Aiman, 3D character',
}: {
    className?: string;
    expression?: CharacterExpression;
    follow?: boolean;
    onClickWink?: boolean;
    alt?: string;
}) {
    const headRef = useRef<HTMLDivElement | null>(null);
    const [popping, setPopping] = useState(false);

    const src = useMemo(
        () => characterImage(controlled ?? 'idle'),
        [controlled],
    );

    // Cursor tracking with lerp. This is user-initiated motion, so it stays
    // active even for reduced-motion visitors — just gentler.
    useEffect(() => {
        if (!follow) {
            return;
        }

        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        const strength = reduce ? 0.4 : 1;

        const target = { x: 0, y: 0 };
        const head = { x: 0, y: 0 };
        let frame = 0;

        const onMove = (event: MouseEvent) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        const loop = () => {
            head.x += (target.x - head.x) * LERP;
            head.y += (target.y - head.y) * LERP;

            if (headRef.current) {
                headRef.current.style.transform = `perspective(900px) rotateY(${
                    head.x * 16 * strength
                }deg) rotateX(${-head.y * 11 * strength}deg) translate3d(${
                    head.x * 24 * strength
                }px, ${head.y * 18 * strength}px, 0)`;
            }

            frame = window.requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        frame = window.requestAnimationFrame(loop);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', onMove);
        };
    }, [follow]);

    const handleClick = () => {
        if (!onClickWink) {
            return;
        }

        setPopping(true);
        window.setTimeout(() => setPopping(false), 500);
    };

    return (
        <div
            className={cn('relative select-none', className)}
            onClick={handleClick}
            data-cursor={onClickWink ? 'Say hi' : undefined}
        >
            <div className="public-character-enter">
                <div className="public-character-float">
                    <div
                        className={cn(
                            'relative',
                            popping && 'public-character-pop',
                        )}
                    >
                        <div
                            ref={headRef}
                            className="relative will-change-transform drop-shadow-[0_30px_50px_rgba(0,0,0,0.30)]"
                        >
                            <div aria-hidden className="public-character-glow" />
                            <img
                                src={src}
                                alt={alt}
                                draggable={false}
                                className="public-character-img relative z-10 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
