import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import MagneticButton from '@/components/public/magnetic-button';
import { CountUp, MaskReveal, Reveal } from '@/components/public/reveal';
import { projectImage } from '@/lib/character';
import { cn } from '@/lib/utils';
import work from '@/routes/work';
import type { Project, ProjectResult } from '@/types/portfolio';

function MetaItem({
    label,
    className,
    children,
}: {
    label: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('border-t border-brand-ink/15 pt-4', className)}>
            <dt className="text-[11px] font-semibold tracking-[0.3em] text-brand-ink/50 uppercase">
                {label}
            </dt>
            <dd className="mt-3 text-sm">{children}</dd>
        </div>
    );
}

function ContentSection({
    label,
    body,
    delay = 0,
}: {
    label: string;
    body: string;
    delay?: number;
}) {
    return (
        <Reveal delay={delay}>
            <div className="grid gap-4 border-t border-brand-ink/10 py-14 md:grid-cols-12 md:gap-8 md:py-20">
                <div className="md:col-span-3">
                    <h2 className="text-[11px] font-semibold tracking-[0.3em] text-brand-ink/50 uppercase md:sticky md:top-32">
                        {label}
                    </h2>
                </div>
                <div className="md:col-span-9">
                    <p className="max-w-3xl text-lg leading-relaxed opacity-85 md:text-2xl md:leading-[1.4]">
                        {body}
                    </p>
                </div>
            </div>
        </Reveal>
    );
}

function StatCard({
    result,
    delay,
}: {
    result: ProjectResult;
    delay: number;
}) {
    return (
        <Reveal delay={delay} className="border-t border-brand-cream/25 pt-6">
            <p className="public-display text-4xl leading-none md:text-5xl">
                <CountUp value={result.value} />
            </p>
            <p className="mt-3 text-[11px] tracking-[0.3em] uppercase opacity-70">
                {result.label}
            </p>
        </Reveal>
    );
}

export default function CaseStudy({
    project,
    nextProject,
}: {
    project: Project;
    nextProject: Project | null;
}) {
    const hero = project.hero_media ?? projectImage(project.title, 'landscape_16_9');
    const tools = project.tools ?? [];

    const sections = [
        { label: 'The challenge', body: project.challenge },
        { label: 'The process', body: project.process },
        { label: 'The solution', body: project.solution },
    ].filter((section): section is { label: string; body: string } =>
        Boolean(section.body && section.body.trim().length > 0),
    );

    const results = project.results ?? [];

    return (
        <>
            <Head title={`${project.title} — Case study`}>
                <meta name="description" content={project.summary} />
            </Head>

            {/* Hero media */}
            <section className="bg-brand-cream px-5 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href={work.index.url()}
                        data-cursor="All work"
                        className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase"
                    >
                        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        All work
                    </Link>

                    <Reveal className="mt-8">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-ink md:aspect-[16/9]">
                            <img
                                src={hero}
                                alt={project.title}
                                className="size-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-brand-cream px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-ink uppercase">
                                    {project.category}
                                </span>
                                {project.badge && (
                                    <span className="rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-ink uppercase">
                                        {project.badge}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Title + summary + meta */}
            <section className="bg-brand-cream px-5 pb-20 md:px-10 md:pb-28">
                <div className="mx-auto max-w-7xl">
                    <h1 className="public-display text-[13vw] leading-[0.9] md:text-[7vw]">
                        <MaskReveal text={project.title} />
                    </h1>

                    <Reveal delay={0.2} className="mt-7 max-w-2xl">
                        <p className="text-base leading-relaxed opacity-75 md:text-lg">
                            {project.summary}
                        </p>
                    </Reveal>

                    <dl className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-4">
                        {project.client && (
                            <MetaItem label="Client">{project.client}</MetaItem>
                        )}
                        {project.year && (
                            <MetaItem label="Year">{project.year}</MetaItem>
                        )}
                        {project.role && (
                            <MetaItem label="Role">{project.role}</MetaItem>
                        )}
                        {tools.length > 0 && (
                            <MetaItem
                                label="Tools"
                                className={cn(
                                    project.client && project.year && project.role
                                        ? 'sm:col-span-2 md:col-span-1'
                                        : 'sm:col-span-2',
                                )}
                            >
                                <ul className="flex flex-wrap gap-2">
                                    {tools.map((tool) => (
                                        <li
                                            key={tool}
                                            className="rounded-full border border-brand-ink/20 px-3 py-1.5 text-xs tracking-wide"
                                        >
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </MetaItem>
                        )}
                    </dl>

                    {project.demo_url && (
                        <Reveal delay={0.1} className="mt-12">
                            <MagneticButton>
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-cursor="Play"
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-7 py-3.5 text-sm font-semibold text-brand-cream"
                                >
                                    Live demo
                                    <ArrowUpRight className="size-4" />
                                </a>
                            </MagneticButton>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Narrative sections */}
            {sections.length > 0 && (
                <section className="bg-brand-cream px-5 md:px-10">
                    <div className="mx-auto max-w-7xl">
                        {sections.map((section, index) => (
                            <ContentSection
                                key={section.label}
                                label={section.label}
                                body={section.body}
                                delay={index * 0.05}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Results */}
            {results.length > 0 && (
                <section className="bg-brand-red px-5 py-20 text-brand-cream md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="public-display text-[13vw] leading-none md:text-[6vw]">
                            Results
                        </h2>
                        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                            {results.map((result, index) => (
                                <StatCard
                                    key={result.label}
                                    result={result}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Next project teaser */}
            {nextProject && (
                <section className="bg-brand-ink px-5 py-20 text-brand-cream md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase opacity-50">
                            Next project
                        </p>

                        <Link
                            href={work.show({ project: nextProject.slug })}
                            data-cursor="View"
                            className="group mt-8 grid items-center gap-8 md:grid-cols-12"
                        >
                            <div className="md:col-span-5">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-brand-red">
                                    <img
                                        src={
                                            nextProject.thumbnail ??
                                            projectImage(nextProject.title)
                                        }
                                        alt={nextProject.title}
                                        loading="lazy"
                                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-7">
                                <h2 className="public-display text-4xl leading-[0.95] md:text-[5vw]">
                                    {nextProject.title}
                                </h2>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
                                    View case study
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
