import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const AVATAR_SRC = '/images/fazliee-avatar.png';

const LERP = 0.1;

const DEFAULT_LINES = [
    'Hi, I’m Fazliee!',
    'I build apps & 360° maps.',
    'Psst — check my work.',
    'Okay, that tickles.',
];

/**
 * Hand-drawn speech bubble whose outline draws itself in, then the text
 * fades up. Re-keyed on every new line so the drawing replays.
 */
function SpeechBubble({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <div
            className="pointer-events-none absolute -top-2 -left-4 z-20 w-[62%] max-w-60 md:-top-4 md:-left-10"
            aria-live="polite"
        >
            <svg
                viewBox="0 0 240 120"
                className="w-full overflow-visible"
                aria-hidden
            >
                <path
                    d="M30 12 C 90 4, 170 4, 216 14 C 236 20, 238 64, 226 78 C 214 92, 150 94, 122 92 L 150 116 L 98 91 C 66 90, 26 88, 14 74 C 2 58, 6 20, 30 12 Z"
                    fill="var(--color-paper-light)"
                    stroke="var(--color-ink)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    pathLength={1}
                    className="public-draw"
                    style={
                        {
                            '--len': 1,
                            '--dur': '0.9s',
                            '--delay': `${delay}s`,
                        } as React.CSSProperties
                    }
                />
            </svg>
            <p
                className="public-display public-fade-in absolute inset-x-[8%] top-[13%] flex h-[58%] items-center justify-center text-center text-[clamp(0.95rem,1.5vw,1.2rem)] leading-tight text-ink"
                style={{ '--delay': `${delay + 0.6}s` } as React.CSSProperties}
            >
                {text}
            </p>
        </div>
    );
}

/**
 * Fazliee's illustrated avatar. It drops in, breathes gently, leans towards
 * the cursor and, when clicked, squashes and says something new.
 */
export default function Avatar({
    className,
    follow = true,
    interactive = true,
    bubble = false,
    lines = DEFAULT_LINES,
    bubbleDelay = 0.9,
    alt = 'Illustrated portrait of Fazliee Aiman in a green cap',
}: {
    className?: string;
    follow?: boolean;
    interactive?: boolean;
    bubble?: boolean;
    lines?: string[];
    bubbleDelay?: number;
    alt?: string;
}) {
    const tiltRef = useRef<HTMLDivElement | null>(null);
    const [popping, setPopping] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);

    // Lean towards the cursor with a little lerp. Calmer for reduced motion.
    useEffect(() => {
        if (!follow || window.matchMedia('(hover: none)').matches) {
            return;
        }

        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        const strength = reduce ? 0.35 : 1;

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

            if (tiltRef.current) {
                tiltRef.current.style.transform = `perspective(900px) rotateY(${
                    head.x * 10 * strength
                }deg) rotateX(${-head.y * 7 * strength}deg) translate3d(${
                    head.x * 12 * strength
                }px, ${head.y * 8 * strength}px, 0)`;
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
        setPopping(true);
        window.setTimeout(() => setPopping(false), 550);
        setLineIndex((index) => (index + 1) % lines.length);
    };

    const image = (
        <img
            src={AVATAR_SRC}
            alt={alt}
            draggable={false}
            width={736}
            height={736}
            className="relative w-full"
        />
    );

    return (
        <div className={cn('relative select-none', className)}>
            {bubble && (
                <SpeechBubble
                    key={lineIndex}
                    text={lines[lineIndex]}
                    delay={lineIndex === 0 ? bubbleDelay : 0}
                />
            )}
            <div className="public-avatar-enter">
                <div className="public-avatar-breathe">
                    <div ref={tiltRef} className="will-change-transform">
                        <div className={cn(popping && 'public-avatar-pop')}>
                            {interactive ? (
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    data-cursor="Say hi"
                                    aria-label="Say hi to Fazliee"
                                    className="block w-full rounded-full"
                                >
                                    {image}
                                </button>
                            ) : (
                                image
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
