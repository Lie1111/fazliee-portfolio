import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import Character from '@/components/public/character';
import MagneticButton from '@/components/public/magnetic-button';
import { MaskReveal, Reveal } from '@/components/public/reveal';
import { projectImage } from '@/lib/character';
import type { ImageSize } from '@/lib/character';
import { cn } from '@/lib/utils';
import { contact } from '@/routes';
import type { Profile, Skill, TimelineItem } from '@/types/portfolio';

const SKILL_GROUP_ORDER = ['Technical', 'Tools', 'Languages'];

const LANGUAGE_PROFICIENCY = ['Native', 'Professional', 'Conversational'];

type FunFact = {
    id: number;
    prompt: string;
    answer: string;
};

const FUN_FACTS: FunFact[] = [
    {
        id: 1,
        prompt: 'Favourite tool?',
        answer: 'Flutter — one codebase, every screen, endless tinkering.',
    },
    {
        id: 2,
        prompt: 'Off the clock?',
        answer: 'Sketching maps, chasing good coffee and building tiny side projects.',
    },
    {
        id: 3,
        prompt: 'Life motto?',
        answer: 'Ship it, learn from it, then make it a little better.',
    },
];

type CollagePhoto = {
    subject: string;
    size: ImageSize;
    aspect: string;
    rotation: string;
    span: string;
    offset: string;
};

const COLLAGE: CollagePhoto[] = [
    {
        subject: 'creative workspace with dual monitors and sketches',
        size: 'landscape_4_3',
        aspect: 'aspect-[16/11]',
        rotation: '-rotate-2',
        span: 'col-span-12 md:col-span-7',
        offset: '',
    },
    {
        subject: 'creative IT graduate portrait holding a laptop',
        size: 'portrait_4_3',
        aspect: 'aspect-[4/5]',
        rotation: 'rotate-2',
        span: 'col-span-6 md:col-span-5',
        offset: 'md:mt-16',
    },
    {
        subject: 'mobile app wireframes and sticky notes on a desk',
        size: 'square_hd',
        aspect: 'aspect-square',
        rotation: 'rotate-1',
        span: 'col-span-6 md:col-span-5',
        offset: 'md:-mt-10',
    },
    {
        subject: 'team collaborating around a whiteboard',
        size: 'landscape_4_3',
        aspect: 'aspect-[16/11]',
        rotation: '-rotate-1',
        span: 'col-span-12 md:col-span-7',
        offset: 'md:mt-8',
    },
];

/**
 * Groups skills by category, keeping the known categories in a stable order
 * and appending any unexpected ones at the end.
 */
function groupSkills(skills: Skill[]): { category: string; items: Skill[] }[] {
    const groups = new Map<string, Skill[]>();

    for (const skill of skills) {
        const bucket = groups.get(skill.category);

        if (bucket) {
            bucket.push(skill);
        } else {
            groups.set(skill.category, [skill]);
        }
    }

    const ordered: { category: string; items: Skill[] }[] = [];

    for (const category of SKILL_GROUP_ORDER) {
        const items = groups.get(category);

        if (items) {
            ordered.push({ category, items });
            groups.delete(category);
        }
    }

    for (const [category, items] of groups) {
        ordered.push({ category, items });
    }

    return ordered;
}

/**
 * A grid of skill cards that drift subtly towards the cursor. Each card is
 * offset by a small amount derived from its index and the whole thing is
 * skipped for reduced-motion visitors.
 */
function CursorGrid({ items }: { items: Skill[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;

        if (
            !container ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        let frame = 0;

        const handleMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            target.current.x = (event.clientX - rect.left) / rect.width - 0.5;
            target.current.y = (event.clientY - rect.top) / rect.height - 0.5;
        };

        const handleLeave = () => {
            target.current.x = 0;
            target.current.y = 0;
        };

        const loop = () => {
            current.current.x += (target.current.x - current.current.x) * 0.08;
            current.current.y += (target.current.y - current.current.y) * 0.08;

            cardRefs.current.forEach((card, index) => {
                if (!card) {
                    return;
                }

                const depth = ((index % 5) - 2) * 7;
                card.style.transform = `translate3d(${current.current.x * depth}px, ${current.current.y * depth}px, 0)`;
            });

            frame = window.requestAnimationFrame(loop);
        };

        container.addEventListener('mousemove', handleMove, { passive: true });
        container.addEventListener('mouseleave', handleLeave);
        frame = window.requestAnimationFrame(loop);

        return () => {
            window.cancelAnimationFrame(frame);
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseleave', handleLeave);
        };
    }, [items.length]);

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
        >
            {items.map((skill, index) => (
                <div
                    key={skill.id}
                    ref={(el) => {
                        cardRefs.current[index] = el;
                    }}
                    className="rounded-2xl border border-brand-ink/15 bg-white/40 px-4 py-5 text-center text-sm font-semibold transition-colors duration-300 will-change-transform hover:border-brand-ink hover:bg-brand-ink hover:text-brand-cream"
                >
                    {skill.name}
                </div>
            ))}
        </div>
    );
}

/**
 * A 3D card that flips to reveal its answer on hover.
 */
function FlipCard({ fact }: { fact: FunFact }) {
    return (
        <div className="group h-64 [perspective:1200px]" data-cursor="Flip">
            <div className="relative size-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-brand-cream p-7 text-brand-ink [backface-visibility:hidden]">
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-50">
                        Fun fact
                    </span>
                    <h3 className="public-display text-2xl md:text-3xl">
                        {fact.prompt}
                    </h3>
                    <span className="text-xs tracking-widest uppercase opacity-50">
                        Hover to reveal
                    </span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-brand-ink p-7 text-brand-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Sparkles className="size-6 text-brand-yellow" />
                    <p className="text-lg leading-snug font-medium">
                        {fact.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * A vertical timeline of education or experience entries.
 */
function TimelineList({
    items,
    borderClassName = 'border-brand-ink/15',
}: {
    items: TimelineItem[];
    borderClassName?: string;
}) {
    return (
        <ol className={cn('relative border-l pl-8', borderClassName)}>
            {items.map((entry) => (
                <li key={entry.id} className="relative pb-10 last:pb-0">
                    <span className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-brand-red" />
                    {entry.period && (
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase opacity-60">
                            {entry.period}
                        </p>
                    )}
                    <h3 className="public-display mt-2 text-2xl md:text-3xl">
                        {entry.title}
                    </h3>
                    {entry.organisation && (
                        <p className="mt-1 text-sm font-semibold opacity-80">
                            {entry.organisation}
                        </p>
                    )}
                    {entry.description && (
                        <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-70">
                            {entry.description}
                        </p>
                    )}
                </li>
            ))}
        </ol>
    );
}

export default function About({
    profile,
    skills,
    education,
    experience,
}: {
    profile: Profile | null;
    skills: Skill[];
    education: TimelineItem[];
    experience: TimelineItem[];
}) {
    const brand = profile?.brand_name ?? 'Fazliee Aiman';
    const firstName = (profile?.name ?? brand).trim().split(/\s+/)[0] ?? 'Fazliee';
    const groups = useMemo(() => groupSkills(skills), [skills]);

    return (
        <>
            <Head title="About" />

            <div className="bg-brand-cream text-brand-ink">
                {/* Hero */}
                <section className="relative overflow-hidden px-5 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
                    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <Reveal>
                                <p className="text-xs font-semibold tracking-[0.3em] uppercase opacity-60">
                                    About
                                </p>
                            </Reveal>
                            <h1 className="public-display mt-4 text-[15vw] leading-[0.86] md:text-[7.2vw]">
                                <MaskReveal
                                    text={`HI, I'M ${firstName.toUpperCase()}.`}
                                />
                            </h1>
                            <Reveal
                                delay={0.25}
                                className="mt-8 flex flex-wrap items-center gap-4 text-xs opacity-80"
                            >
                                {profile?.availability && (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                                        {profile.availability}
                                    </span>
                                )}
                                {profile?.location && (
                                    <>
                                        <span aria-hidden>✦</span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="size-3.5" />
                                            {profile.location}
                                        </span>
                                    </>
                                )}
                            </Reveal>
                        </div>
                        <div className="md:col-span-5">
                            <Reveal
                                delay={0.15}
                                className="mx-auto w-[58vw] max-w-xs md:w-full md:max-w-sm"
                            >
                                <Character alt={profile?.name ?? brand} />
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="bg-brand-ink px-5 py-24 text-brand-cream md:px-10 md:py-32">
                    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
                        <div className="md:col-span-8">
                            <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                                The story
                            </p>
                            <Reveal delay={0.1}>
                                <p className="public-display mt-6 text-3xl leading-[1.08] md:text-[3.2vw]">
                                    {profile?.about_story ??
                                        'A longer story is on its way.'}
                                </p>
                            </Reveal>
                        </div>
                        <div className="md:col-span-4 md:pt-16">
                            <Reveal delay={0.2}>
                                <p className="text-sm leading-relaxed opacity-75">
                                    {profile?.intro}
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section className="px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <h2 className="public-display text-[14vw] leading-none md:text-[7vw]">
                                <MaskReveal text="Skills" />
                            </h2>
                            <p className="max-w-xs text-sm opacity-70">
                                The tools I reach for, grouped by how I use them.
                            </p>
                        </div>

                        <div className="mt-14 space-y-16">
                            {groups.map((group) => (
                                <div key={group.category}>
                                    <Reveal className="flex items-center gap-4">
                                        <h3 className="public-display text-2xl md:text-3xl">
                                            {group.category}
                                        </h3>
                                        <span className="text-xs tracking-[0.25em] uppercase opacity-50">
                                            {String(
                                                group.items.length,
                                            ).padStart(2, '0')}
                                        </span>
                                    </Reveal>

                                    {group.category === 'Languages' ? (
                                        <Reveal
                                            delay={0.1}
                                            className="mt-6 max-w-xl"
                                        >
                                            <ul className="divide-y divide-brand-ink/15 border-y border-brand-ink/15">
                                                {group.items.map(
                                                    (skill, index) => (
                                                        <li
                                                            key={skill.id}
                                                            className="flex items-center justify-between gap-4 py-4"
                                                        >
                                                            <span className="public-display text-xl">
                                                                {skill.name}
                                                            </span>
                                                            <span className="rounded-full bg-brand-ink px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-cream uppercase">
                                                                {LANGUAGE_PROFICIENCY[
                                                                    index
                                                                ] ??
                                                                    'Conversational'}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </Reveal>
                                    ) : (
                                        <div className="mt-6">
                                            <CursorGrid items={group.items} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {groups.length === 0 && (
                                <p className="text-sm opacity-60">
                                    Skills will appear here once added in the
                                    control panel.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Fun facts */}
                <section className="bg-brand-red px-5 py-24 text-brand-cream md:px-10 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="public-display text-[14vw] leading-none md:text-[7vw]">
                            <MaskReveal text="Off the clock" />
                        </h2>

                        <div className="mt-14 grid gap-6 md:grid-cols-3">
                            {FUN_FACTS.map((fact, index) => (
                                <Reveal key={fact.id} delay={index * 0.08}>
                                    <FlipCard fact={fact} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Snapshots collage */}
                <section className="px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="public-display text-[14vw] leading-none md:text-[7vw]">
                            <MaskReveal text="Snapshots" />
                        </h2>

                        <div className="mt-14 grid grid-cols-12 items-start gap-4 md:gap-6">
                            {COLLAGE.map((photo, index) => (
                                <Reveal
                                    key={photo.subject}
                                    delay={index * 0.06}
                                    className={cn(photo.span, photo.offset)}
                                >
                                    <div
                                        data-cursor="Snapshot"
                                        className={cn(
                                            'overflow-hidden rounded-3xl border border-brand-ink/10 bg-brand-ink shadow-sm transition-transform duration-500 ease-out will-change-transform hover:rotate-0',
                                            photo.aspect,
                                            photo.rotation,
                                        )}
                                    >
                                        <img
                                            src={projectImage(
                                                photo.subject,
                                                photo.size,
                                            )}
                                            alt={photo.subject}
                                            loading="lazy"
                                            className="size-full object-cover"
                                        />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Resume + contact */}
                <section className="bg-brand-yellow px-5 py-24 text-brand-ink md:px-10 md:py-32">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-12">
                        <div className="md:col-span-8">
                            <h2 className="public-display text-[13vw] leading-[0.92] md:text-[6vw]">
                                <MaskReveal text="Let's work together" />
                            </h2>
                            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
                                {profile?.availability
                                    ? `${profile.availability} — `
                                    : ''}
                                drop me a line and I'll get back to you soon.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                            {profile?.resume_url && (
                                <MagneticButton>
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-cursor="Download"
                                        className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-7 py-3.5 text-sm font-semibold text-brand-cream"
                                    >
                                        Download resume
                                        <Download className="size-4" />
                                    </a>
                                </MagneticButton>
                            )}
                            <MagneticButton>
                                <Link
                                    href={contact.url()}
                                    data-cursor="Say hi"
                                    className="inline-flex items-center gap-2 rounded-full border border-brand-ink/50 px-7 py-3.5 text-sm font-semibold text-brand-ink"
                                >
                                    Let&apos;s talk
                                    <ArrowRight className="size-4" />
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section className="px-5 py-24 md:px-10 md:py-32">
                    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
                        <div className="md:col-span-4">
                            <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                                Education
                            </p>
                            <h2 className="public-display mt-4 text-4xl md:text-5xl">
                                Where I learned
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            {education.length > 0 ? (
                                <TimelineList items={education} />
                            ) : (
                                <p className="text-sm opacity-60">
                                    Education milestones will appear here once
                                    added.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section className="bg-brand-ink px-5 py-24 text-brand-cream md:px-10 md:py-32">
                    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
                        <div className="md:col-span-4">
                            <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                                Experience
                            </p>
                            <h2 className="public-display mt-4 text-4xl md:text-5xl">
                                What I&apos;ve done
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            {experience.length > 0 ? (
                                <TimelineList
                                    items={experience}
                                    borderClassName="border-brand-cream/20"
                                />
                            ) : (
                                <p className="text-sm opacity-60">
                                    Experience will appear here once added.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
