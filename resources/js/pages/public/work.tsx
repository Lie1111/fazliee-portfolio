import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, LayoutGrid, LayoutList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import MagneticButton from '@/components/public/magnetic-button';
import { CountUp, MaskReveal, Reveal } from '@/components/public/reveal';
import ProjectCover from '@/components/public/project-cover';
import { cn } from '@/lib/utils';
import { contact } from '@/routes';
import work from '@/routes/work';
import type { Project } from '@/types/portfolio';

type ViewMode = 'list' | 'grid';

function FilterChip({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'shrink-0 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors duration-300',
                active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/25 text-ink hover:border-ink',
            )}
        >
            {label}
        </button>
    );
}

function ViewToggle({
    view,
    onChange,
}: {
    view: ViewMode;
    onChange: (view: ViewMode) => void;
}) {
    const options: { value: ViewMode; label: string; Icon: LucideIcon }[] = [
        { value: 'list', label: 'List view', Icon: LayoutList },
        { value: 'grid', label: 'Grid view', Icon: LayoutGrid },
    ];

    return (
        <div
            role="group"
            aria-label="Switch layout"
            className="inline-flex items-center gap-1 rounded-full border-2 border-ink p-1"
        >
            {options.map(({ value, label, Icon }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => onChange(value)}
                    aria-label={label}
                    aria-pressed={view === value}
                    className={cn(
                        'inline-flex size-9 items-center justify-center rounded-full transition-colors duration-300',
                        view === value
                            ? 'bg-ink text-paper'
                            : 'text-ink hover:bg-ink/10',
                    )}
                >
                    <Icon className="size-4" />
                </button>
            ))}
        </div>
    );
}

function WorkRow({
    project,
    index,
    onHover,
}: {
    project: Project;
    index: number;
    onHover: (index: number | null) => void;
}) {
    return (
        <Reveal delay={index * 0.04}>
            <Link
                href={work.show({ project: project.slug })}
                data-cursor="View"
                onMouseEnter={() => onHover(index)}
                onFocus={() => onHover(index)}
                className="group flex items-center justify-between gap-6 border-t-2 border-ink py-8 md:py-10"
            >
                <span className="public-display text-[clamp(1.75rem,4.5vw,4rem)] transition-[translate,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-cap">
                    {project.title}
                </span>

                <div className="flex shrink-0 items-center gap-4">
                    <div className="flex flex-col items-end gap-1.5 text-right">
                        <span className="text-xs font-semibold opacity-60">
                            {project.category}
                        </span>
                        {project.year && (
                            <span className="text-xs opacity-50">
                                {project.year}
                            </span>
                        )}
                        {project.badge && (
                            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold text-ink">
                                {project.badge}
                            </span>
                        )}
                    </div>
                    <ArrowUpRight className="hidden size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:block" />
                </div>
            </Link>
        </Reveal>
    );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
    return (
        <Reveal delay={index * 0.05}>
            <Link
                href={work.show({ project: project.slug })}
                data-cursor="View"
                className="group block"
            >
                <div className="public-outline relative aspect-[16/10] overflow-hidden rounded-2xl transition-[translate,box-shadow] duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_var(--color-ink)]">
                    <ProjectCover project={project} index={index} />
                    <span className="absolute top-4 left-4 rounded-full border-2 border-ink bg-paper-light px-3 py-1 text-xs font-semibold text-ink">
                        {project.category}
                    </span>
                    {project.badge && (
                        <span className="absolute top-4 right-4 rounded-full border-2 border-ink bg-peach px-3 py-1 text-xs font-semibold text-ink">
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
                    <ArrowUpRight className="mt-2 size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </Link>
        </Reveal>
    );
}

export default function Work({
    projects,
    categories,
}: {
    projects: Project[];
    categories: string[];
}) {
    const [category, setCategory] = useState<string>('All');
    const [view, setView] = useState<ViewMode>('list');
    const [canHover, setCanHover] = useState(false);
    const [preview, setPreview] = useState<number | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setCanHover(!window.matchMedia('(hover: none)').matches);
    }, []);

    const filtered =
        category === 'All'
            ? projects
            : projects.filter((project) => project.category === category);

    const onListMove = (event: MouseEvent<HTMLDivElement>) => {
        const el = previewRef.current;

        if (!el || !canHover) {
            return;
        }

        el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    return (
        <>
            <Head title="Selected work" />

            {/* Header */}
            <section className="px-5 pt-32 pb-14 md:px-10 md:pt-36 md:pb-20">
                <div className="mx-auto max-w-7xl">
                    <h1 className="public-display text-[24vw] leading-none md:text-[13vw]">
                        <MaskReveal text="Work" />
                    </h1>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                        <p className="max-w-md text-lg leading-relaxed opacity-80">
                            Apps, 360° experiences and web systems I have
                            designed and built.
                        </p>
                        <p className="text-sm opacity-60">
                            <CountUp value={String(filtered.length)} /> projects
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters + view toggle */}
            <section className="px-5 md:px-10">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-y-2 border-ink py-5">
                    <div className="flex flex-nowrap gap-2 overflow-x-auto">
                        <FilterChip
                            label="All"
                            active={category === 'All'}
                            onClick={() => setCategory('All')}
                        />
                        {categories.map((item) => (
                            <FilterChip
                                key={item}
                                label={item}
                                active={category === item}
                                onClick={() => setCategory(item)}
                            />
                        ))}
                    </div>
                    <ViewToggle view={view} onChange={setView} />
                </div>
            </section>

            {/* Projects */}
            <section className="px-5 py-14 md:px-10 md:py-20">
                <div className="mx-auto max-w-7xl">
                    {filtered.length === 0 ? (
                        <p className="py-16 text-center text-sm opacity-60">
                            No projects here yet — check back soon.
                        </p>
                    ) : view === 'list' ? (
                        <div
                            onMouseMove={onListMove}
                            onMouseLeave={() => setPreview(null)}
                        >
                            <div className="border-b-2 border-ink">
                                {filtered.map((project, index) => (
                                    <WorkRow
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        onHover={setPreview}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((project) => (
                                <WorkCard
                                    key={project.id}
                                    project={project}
                                    index={projects.indexOf(project)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Floating cursor preview (hover devices, list view only) */}
            {canHover && view === 'list' && (
                <div
                    ref={previewRef}
                    className="pointer-events-none fixed top-0 left-0 z-40"
                    style={{ willChange: 'transform' }}
                >
                    <div
                        className={cn(
                            'public-outline aspect-[4/3] w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl transition-[opacity,scale,rotate] duration-300 md:w-72',
                            preview === null
                                ? 'scale-75 rotate-6 opacity-0'
                                : 'scale-100 -rotate-2 opacity-100',
                        )}
                    >
                        {preview !== null && filtered[preview] && (
                            <ProjectCover
                                project={filtered[preview]}
                                index={projects.indexOf(filtered[preview])}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="mt-10 bg-cap px-5 py-20 text-paper md:px-10 md:py-28">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <h2 className="public-display text-[12vw] leading-[0.95] md:text-[5vw]">
                        <MaskReveal text="Have a project in mind?" />
                    </h2>
                    <MagneticButton>
                        <Link
                            href={contact.url()}
                            data-cursor="Start"
                            className="public-outline inline-flex items-center gap-2 rounded-full bg-paper-light px-8 py-4 font-semibold text-ink"
                        >
                            Start a project
                            <ArrowRight className="size-4" />
                        </Link>
                    </MagneticButton>
                </div>
            </section>
        </>
    );
}
