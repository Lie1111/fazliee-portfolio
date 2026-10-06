import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import Character from '@/components/public/character';
import MagneticButton from '@/components/public/magnetic-button';
import Marquee from '@/components/public/marquee';
import { MaskReveal, Reveal } from '@/components/public/reveal';
import LocalClock from '@/components/public/local-clock';
import ServiceCard from '@/components/public/service-card';
import { contact } from '@/routes';
import work from '@/routes/work';
import type { Profile, Project, Service, TimelineItem } from '@/types/portfolio';
import { projectImage } from '@/lib/character';

const TECH_STACK = [
    'Dart',
    'Flutter',
    'C#',
    'Unity',
    'Java',
    'JavaScript',
    'PHP',
    'MariaDB',
    'SQL',
    'HTML/CSS',
    'Bootstrap',
    'WordPress',
    'Android Studio',
    'GitHub',
];

function ScrollCircle() {
    return (
        <div className="pointer-events-none relative size-14 lg:size-16">
            <div className="relative size-full [animation:public-spin-slow_18s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="size-full">
                    <defs>
                        <path
                            id="scroll-circle"
                            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                        />
                    </defs>
                    <text className="fill-brand-cream text-[9px] font-semibold tracking-[0.4em] uppercase">
                        <textPath href="#scroll-circle" startOffset="0%">
                            Scroll ✦ Scroll ✦
                        </textPath>
                    </text>
                </svg>
            </div>
            <ArrowDown className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-brand-cream" />
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const image = project.thumbnail ?? projectImage(project.title);

    return (
        <Reveal className="col-span-full md:col-span-6" delay={index * 0.05}>
            <Link
                href={work.show({ project: project.slug })}
                data-cursor="View"
                className="group block"
            >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-brand-ink">
                    <img
                        src={image}
                        alt={project.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-brand-cream px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-ink uppercase">
                        {project.category}
                    </span>
                    {project.badge && (
                        <span className="absolute top-4 right-4 rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-ink uppercase">
                            {project.badge}
                        </span>
                    )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="public-display text-2xl md:text-3xl">
                            {project.title}
                        </h3>
                        <p className="mt-1 max-w-md text-sm opacity-70">
                            {project.summary}
                        </p>
                    </div>
                    <ArrowUpRight className="mt-2 size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
            </Link>
        </Reveal>
    );
}

export default function Home({
    profile,
    projects,
    services,
    journey,
}: {
    profile: Profile | null;
    projects: Project[];
    services: Service[];
    journey: TimelineItem[];
}) {
    const brand = profile?.brand_name ?? 'Fazliee Aiman';

    const heroRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Character parallax: rises and scales down as user scrolls
    const characterY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const characterScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const characterOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

    // Headline subtle parallax
    const headlineY = useTransform(scrollYProgress, [0, 1], [0, 60]);

    return (
        <>
            <Head title={`${brand} — Creative IT Portfolio`}>
                <meta
                    name="description"
                    content={profile?.intro ?? 'Creative IT portfolio of Fazliee Aiman.'}
                />
            </Head>

            {/* Hero - exactly 100svh */}
            <section
                ref={heroRef}
                className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-red px-4 text-brand-cream md:px-8"
            >
                {/* Subtle radial glow behind character */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-1/2 size-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,236,0.15),transparent_60%)]"
                />

                <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 md:grid-cols-12 md:gap-8">
                    {/* Left: Headline */}
                    <div className="col-span-full md:col-span-4">
                        <motion.h1
                            style={{ y: headlineY }}
                            className="public-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92]"
                        >
                            <MaskReveal text={profile?.headline ?? 'I turn ideas into apps, maps & websites.'} />
                        </motion.h1>
                    </div>

                    {/* Center: Character - pinned and scales on scroll */}
                    <motion.div
                        style={{
                            y: characterY,
                            scale: characterScale,
                            opacity: characterOpacity,
                        }}
                        className="col-span-full md:col-span-4"
                    >
                        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
                            <Character alt={brand} />
                        </div>
                    </motion.div>

                    {/* Right: Content - bottom aligned with image */}
                    <div className="col-span-full md:col-span-4 md:self-end">
                        <Reveal delay={0.15}>
                            <p className="max-w-sm text-sm leading-relaxed opacity-85 md:text-base">
                                {profile?.intro}
                            </p>
                        </Reveal>

                        <Reveal delay={0.25} className="mt-5 flex flex-wrap gap-3">
                            <MagneticButton>
                                <Link
                                    href={work.index()}
                                    data-cursor="See work"
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-6 py-3 text-sm font-semibold text-brand-ink"
                                >
                                    See my work
                                    <ArrowRight className="size-4" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href={contact()}
                                    data-cursor="Say hi"
                                    className="inline-flex items-center gap-2 rounded-full border border-brand-cream/60 px-6 py-3 text-sm font-semibold text-brand-cream"
                                >
                                    Let&apos;s talk
                                </Link>
                            </MagneticButton>
                        </Reveal>

                        <Reveal delay={0.35} className="mt-5 flex flex-wrap items-center gap-4 text-xs opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                                {profile?.availability}
                            </span>
                            <span aria-hidden>✦</span>
                            <span>{profile?.location}</span>
                            <span aria-hidden>✦</span>
                            <LocalClock className="md:hidden" withLabel />
                        </Reveal>
                    </div>
                </div>

                {/* Scroll indicator - bottom center */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8">
                    <ScrollCircle />
                </div>
            </section>

            {/* Marquee */}
            <section className="bg-brand-ink text-brand-cream">
                <Marquee
                    items={TECH_STACK}
                    itemClassName="public-display text-2xl md:text-3xl"
                />
            </section>

            {/* Selected work */}
            <section className="bg-brand-cream px-4 py-24 md:px-8 md:py-32">
                <div className="mx-auto max-w-7xl">
                    <Reveal>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <h2 className="public-display text-[clamp(2.5rem,12vw,6rem)] leading-none">
                                Selected work
                            </h2>
                            <Link
                                href={work.index()}
                                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
                                data-cursor="All work"
                            >
                                All projects
                                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                        {projects.length === 0 && (
                            <p className="col-span-full text-sm opacity-60">
                                Projects will appear here once added in the control panel.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* About teaser */}
            <section className="bg-brand-ink px-4 py-24 text-brand-cream md:px-8 md:py-32">
                <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-center">
                    <Reveal className="md:col-span-8">
                        <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                            About
                        </p>
                        <p className="public-display mt-6 text-3xl leading-[1.05] md:text-[clamp(1.8rem,3.4vw,3rem)]">
                            {profile?.about_story}
                        </p>
                    </Reveal>
                    <Reveal delay={0.15} className="md:col-span-4">
                        <div className="group relative mx-auto aspect-[4/5] w-full max-w-xs rotate-3 overflow-hidden rounded-3xl bg-brand-red transition-transform duration-500 hover:rotate-0">
                            <img
                                src={projectImage('creative IT graduate portrait', 'portrait_4_3')}
                                alt={brand}
                                loading="lazy"
                                className="size-full object-cover"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* What I do — sticky stacking cards */}
            <section className="relative bg-brand-red px-4 py-24 text-brand-cream md:px-8 md:py-32">
                {/* Animated mesh gradient blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-[10%] h-96 w-96 rounded-full bg-brand-yellow/10 blur-[120px] [animation:public-float_8s_ease-in-out_infinite]" />
                    <div className="absolute bottom-20 right-[8%] h-96 w-96 rounded-full bg-brand-cream/5 blur-[120px] [animation:public-float_10s_ease-in-out_infinite_reverse]" />
                </div>

                {/* Grid pattern texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
                        backgroundSize: 'clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)',
                    }}
                />

                {/* Repeating big text watermark */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="public-display select-none whitespace-nowrap text-[clamp(8rem,30vw,30rem)] font-black uppercase leading-none text-brand-cream/[0.04]">
                        Services · What I do · Services · What I do ·
                    </span>
                </div>

                {/* Decorative corner brackets */}
                <div className="pointer-events-none absolute top-16 left-4 hidden h-16 w-16 md:block">
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-brand-cream/15" />
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-brand-cream/15" />
                </div>
                <div className="pointer-events-none absolute top-16 right-4 hidden h-16 w-16 md:block">
                    <div className="absolute top-0 right-0 h-[2px] w-full bg-brand-cream/15" />
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-brand-cream/15" />
                </div>
                <div className="pointer-events-none absolute bottom-16 left-4 hidden h-16 w-16 md:block">
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-brand-cream/15" />
                    <div className="absolute bottom-0 left-0 h-full w-[2px] bg-brand-cream/15" />
                </div>
                <div className="pointer-events-none absolute bottom-16 right-4 hidden h-16 w-16 md:block">
                    <div className="absolute bottom-0 right-0 h-[2px] w-full bg-brand-cream/15" />
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-brand-cream/15" />
                </div>

                <div className="relative mx-auto max-w-7xl">
                    {/* Dramatic section header */}
                    <Reveal>
                        <div className="mb-20 flex items-end justify-between">
                            <div>
                                <p className="mb-3 text-xs tracking-[0.4em] uppercase opacity-40">
                                    — Capabilities
                                </p>
                                <h2 className="public-display text-[clamp(2.5rem,12vw,6rem)] leading-none">
                                    What I do
                                </h2>
                            </div>
                            <div className="hidden text-right md:block">
                                <span className="block text-xs tracking-[0.3em] uppercase opacity-50">
                                    Services
                                </span>
                                <span className="mt-1 block text-2xl font-light opacity-30">
                                    {services.length} offered
                                </span>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                total={services.length}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey — horizontal scroll */}
            <section className="overflow-hidden bg-brand-cream py-24 md:py-32">
                <div className="px-4 md:px-8">
                    <Reveal>
                        <h2 className="public-display text-[clamp(2.5rem,12vw,6rem)] leading-none">
                            The journey
                        </h2>
                    </Reveal>
                </div>
                <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 md:px-8">
                    {journey.map((entry, index) => (
                        <Reveal key={entry.id} delay={index * 0.08} className="w-72 shrink-0 snap-start md:w-96">
                            <article className="rounded-3xl border border-brand-ink/15 p-7">
                                <span className="public-display text-4xl text-brand-red">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <p className="mt-6 text-xs tracking-[0.25em] uppercase opacity-60">
                                    {entry.period}
                                </p>
                                <h3 className="public-display mt-2 text-2xl">{entry.title}</h3>
                                {entry.organisation && (
                                    <p className="mt-2 text-sm opacity-70">{entry.organisation}</p>
                                )}
                                {entry.description && (
                                    <p className="mt-4 text-sm opacity-70">{entry.description}</p>
                                )}
                            </article>
                        </Reveal>
                    ))}
                    {journey.length === 0 && (
                        <p className="text-sm opacity-60">
                            Journey milestones will appear here once added.
                        </p>
                    )}
                </div>
            </section>

            {/* Big CTA */}
            <section className="relative overflow-hidden bg-brand-yellow px-4 pt-24 text-brand-ink md:px-8 md:pt-32">
                <div className="mx-auto max-w-7xl text-center">
                    <Reveal>
                        <h2 className="public-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.92]">
                            <MaskReveal text="Let's make something great" />
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15} className="mt-8 flex justify-center">
                        <MagneticButton>
                            <Link
                                href={contact()}
                                data-cursor="Start"
                                className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-8 py-4 text-sm font-semibold text-brand-cream"
                            >
                                Start a project
                                <ArrowRight className="size-4" />
                            </Link>
                        </MagneticButton>
                    </Reveal>
                </div>
                <div className="pointer-events-none mx-auto mt-10 w-56 translate-y-6 md:w-72">
                    <Character follow={false} alt={brand} />
                </div>
            </section>
        </>
    );
}
