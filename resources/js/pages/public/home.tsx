import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import Avatar from '@/components/public/avatar';
import MagneticButton from '@/components/public/magnetic-button';
import Marquee from '@/components/public/marquee';
import ProjectCover from '@/components/public/project-cover';
import { MaskReveal, Reveal } from '@/components/public/reveal';
import { cn } from '@/lib/utils';
import { about, contact, whatIDo } from '@/routes';
import work from '@/routes/work';
import type {
    Profile,
    Project,
    Service,
    TimelineItem,
} from '@/types/portfolio';

const TECH_STACK = [
    'Flutter',
    'Dart',
    'Unity',
    'C#',
    'Java',
    'JavaScript',
    'PHP',
    'MariaDB',
    'SQL',
    'HTML & CSS',
    'Bootstrap',
    'WordPress',
    'Android Studio',
    'GitHub',
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <Reveal
            className={cn('md:col-span-6', index % 2 === 1 && 'md:mt-28')}
            delay={(index % 2) * 0.08}
        >
            <Link
                href={work.show({ project: project.slug })}
                data-cursor="View"
                className="group block"
            >
                <div className="public-outline relative aspect-[16/10] overflow-hidden rounded-2xl transition-[translate,box-shadow] duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_var(--color-ink)]">
                    <ProjectCover project={project} index={index} />
                    {project.badge && (
                        <span className="absolute top-4 left-4 rounded-full border-2 border-ink bg-paper-light px-3 py-1 text-xs font-semibold">
                            {project.badge}
                        </span>
                    )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-cap">{project.category}</p>
                        <h3 className="public-display mt-1 text-[clamp(1.6rem,2.6vw,2.25rem)]">
                            {project.title}
                        </h3>
                        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed opacity-75">
                            {project.summary}
                        </p>
                    </div>
                    <ArrowUpRight className="mt-6 size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </Link>
        </Reveal>
    );
}

function ServiceRow({ service }: { service: Service }) {
    const items = service.items ?? [];

    return (
        <Reveal>
            <Link
                href={whatIDo.url()}
                data-cursor="Details"
                className="group relative block overflow-hidden border-t-2 border-ink"
            >
                <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-cap transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />
                <div className="relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-paper md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                    <h3 className="public-display text-[clamp(1.9rem,4vw,3.5rem)] md:col-span-6">
                        {service.title}
                    </h3>
                    <div className="md:col-span-6">
                        <p className="max-w-lg leading-relaxed opacity-80">
                            {service.description}
                        </p>
                        {items.length > 0 && (
                            <p className="mt-3 text-sm opacity-60">
                                {items.join(', ')}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </Reveal>
    );
}

function Journey({ entries }: { entries: TimelineItem[] }) {
    const ref = useRef<HTMLOListElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.85', 'end 0.55'],
    });
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <ol
            ref={ref}
            className="relative mt-14 grid gap-12 md:grid-cols-4 md:gap-8"
        >
            {/* The path drawn as you scroll: horizontal on desktop, vertical on mobile. */}
            <span
                aria-hidden
                className="absolute top-[0.9rem] right-0 left-0 hidden h-0.5 bg-ink/15 md:block"
            >
                <motion.span
                    style={{ scaleX: progress }}
                    className="block h-full origin-left bg-cap"
                />
            </span>
            <span
                aria-hidden
                className="absolute top-0 bottom-0 left-[0.9rem] w-0.5 bg-ink/15 md:hidden"
            >
                <motion.span
                    style={{ scaleY: progress }}
                    className="block h-full origin-top bg-cap"
                />
            </span>

            {entries.map((entry, index) => (
                <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-12%' }}
                    transition={{
                        duration: 0.7,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-12 md:pl-0"
                >
                    <span className="absolute top-0 left-0 flex size-[1.9rem] items-center justify-center rounded-full border-2 border-ink bg-paper-light text-xs font-bold md:relative">
                        {index + 1}
                    </span>
                    <p className="public-display mt-0 text-4xl text-cap md:mt-6 md:text-5xl">
                        {entry.period}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold">
                        {entry.title}
                    </h3>
                    {entry.organisation && (
                        <p className="text-sm opacity-70">
                            {entry.organisation}
                        </p>
                    )}
                    {entry.description && (
                        <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-70">
                            {entry.description}
                        </p>
                    )}
                </motion.li>
            ))}
        </ol>
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
    const avatarY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <>
            <Head title={`${brand}, Creative IT portfolio`}>
                <meta
                    name="description"
                    content={
                        profile?.intro ??
                        'Creative IT portfolio of Fazliee Aiman.'
                    }
                />
            </Head>

            {/* Hero */}
            <section
                ref={heroRef}
                className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 md:px-10 md:pt-24"
            >
                <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-12 md:gap-6">
                    <motion.div
                        style={{ y: headlineY }}
                        className="order-2 md:order-1 md:col-span-7"
                    >
                        <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                            {profile?.availability && (
                                <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper-light px-3 py-1 font-semibold">
                                    <span className="relative flex size-2">
                                        <span className="absolute inset-0 animate-ping rounded-full bg-cap opacity-60 motion-reduce:hidden" />
                                        <span className="relative size-2 rounded-full bg-cap" />
                                    </span>
                                    {profile.availability}
                                </span>
                            )}
                            {profile?.location && (
                                <span className="opacity-70">
                                    {profile.location}
                                </span>
                            )}
                        </Reveal>

                        <h1 className="public-display mt-6 text-[clamp(2.9rem,min(7.2vw,11svh),6.75rem)]">
                            <MaskReveal
                                text={
                                    profile?.headline ??
                                    'I turn ideas into apps, maps & websites.'
                                }
                                delay={0.15}
                            />
                        </h1>

                        <Reveal delay={0.45}>
                            <p className="mt-7 max-w-md text-lg leading-relaxed opacity-80">
                                {profile?.intro}
                            </p>
                        </Reveal>

                        <Reveal
                            delay={0.55}
                            className="mt-9 flex flex-wrap gap-4"
                        >
                            <MagneticButton>
                                <Link
                                    href={work.index()}
                                    data-cursor="See work"
                                    className="public-outline inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-cap)]"
                                >
                                    See my work
                                    <ArrowRight className="size-4" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href={contact()}
                                    data-cursor="Say hi"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-7 py-3.5 font-semibold transition-colors hover:bg-paper-light"
                                >
                                    Get in touch
                                </Link>
                            </MagneticButton>
                        </Reveal>
                    </motion.div>

                    <motion.div
                        style={{ y: avatarY }}
                        className="order-1 md:order-2 md:col-span-5"
                    >
                        <Avatar
                            bubble
                            alt={`Illustrated portrait of ${brand}`}
                            className="mx-auto w-[min(62vw,17rem)] md:w-full md:max-w-[30rem]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Tech stack */}
            <section
                aria-label="Tools I use"
                className="border-y-2 border-ink bg-forest text-paper"
            >
                <Marquee
                    items={TECH_STACK}
                    itemClassName="public-display text-2xl md:text-4xl"
                />
            </section>

            {/* Selected work */}
            <section className="px-5 py-24 md:px-10 md:py-36">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <h2 className="public-display text-[clamp(2.75rem,8vw,6.5rem)]">
                            <MaskReveal text="Selected work" />
                        </h2>
                        <Link
                            href={work.index()}
                            data-cursor="All work"
                            className="group inline-flex items-center gap-2 font-semibold"
                        >
                            All projects
                            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                        {projects.length === 0 && (
                            <p className="col-span-full opacity-60">
                                Projects will appear here once added in the
                                control panel.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* About teaser */}
            <section className="bg-forest px-5 py-24 text-paper md:px-10 md:py-36">
                <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
                    <Reveal className="md:col-span-9">
                        <p className="public-display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.08] font-bold">
                            {profile?.about_story}
                        </p>
                    </Reveal>
                    <Reveal delay={0.15} className="md:col-span-3 md:self-end">
                        <Link
                            href={about.url()}
                            data-cursor="About"
                            className="group inline-flex items-center gap-2 rounded-full border-2 border-paper px-6 py-3 font-semibold transition-colors hover:bg-paper hover:text-forest"
                        >
                            More about me
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* What I do */}
            <section className="px-5 py-24 md:px-10 md:py-36">
                <div className="mx-auto max-w-7xl">
                    <h2 className="public-display text-[clamp(2.75rem,8vw,6.5rem)]">
                        <MaskReveal text="What I do" />
                    </h2>
                    <div className="mt-14 border-b-2 border-ink">
                        {services.map((service) => (
                            <ServiceRow key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey */}
            {journey.length > 0 && (
                <section className="bg-paper-light px-5 py-24 md:px-10 md:py-36">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="public-display text-[clamp(2.75rem,8vw,6.5rem)]">
                            <MaskReveal text="How I got here" />
                        </h2>
                        <Journey entries={journey} />
                    </div>
                </section>
            )}
        </>
    );
}
