import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, LayoutGrid, LayoutList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import MagneticButton from '@/components/public/magnetic-button';
import { CountUp, MaskReveal, Reveal } from '@/components/public/reveal';
import { projectImage } from '@/lib/character';
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
                'shrink-0 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300',
                active
                    ? 'bg-brand-ink text-brand-cream'
                    : 'border border-brand-ink/25 text-brand-ink hover:border-brand-ink',
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
            className="inline-flex items-center gap-1 rounded-full border border-brand-ink/20 p-1"
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
                            ? 'bg-brand-ink text-brand-cream'
                            : 'text-brand-ink hover:bg-brand-ink/10',
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
    onHover: (image: string | null) => void;
}) {
    const image = project.thumbnail ?? projectImage(project.title);

    return (
        <Reveal delay={index * 0.04}>
            <Link
                href={work.show({ project: project.slug })}
                data-cursor="View"
                onMouseEnter={() => onHover(image)}
                onFocus={() => onHover(image)}
                className="group flex items-center justify-between gap-6 border-t border-brand-ink/15 py-8 md:py-10"
            >
                <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="hidden text-xs font-semibold opacity-40 md:block">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="public-display text-[9vw] leading-none transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[4.5vw]">
                        {project.title}
                    </span>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                    <div className="flex flex-col items-end gap-1.5 text-right">
                        <span className="text-[10px] font-semibold tracking-widest uppercase opacity-60">
                            {project.category}
                        </span>
                        {project.year && (
                            <span className="text-xs opacity-50">
                                {project.year}
                            </span>
                        )}
                        {project.badge && (
                            <span className="rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-ink uppercase">
                                {project.badge}
                            </span>
                        )}
                    </div>
                    <ArrowUpRight className="hidden size-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block" />
                </div>
            </Link>
        </Reveal>
    );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
    const image = project.thumbnail ?? projectImage(project.title);

    return (
        <Reveal delay={index * 0.05}>
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
    const [preview, setPreview] = useState<string | null>(null);
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
                    <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                        Portfolio
                    </p>
                    <h1 className="public-display mt-4 text-[24vw] leading-none md:text-[13vw]">
                        <MaskReveal text="Work" />
                    </h1>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                        <p className="max-w-md text-sm leading-relaxed opacity-80">
                            Selected projects — apps, 360° experiences and web
                            systems.
                        </p>
                        <p className="text-xs tracking-[0.25em] uppercase opacity-60">
                            <CountUp value={String(filtered.length)} /> projects
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters + view toggle */}
            <section className="px-5 md:px-10">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-y border-brand-ink/15 py-5">
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
                            <div className="border-b border-brand-ink/15">
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
                            {filtered.map((project, index) => (
                                <WorkCard
                                    key={project.id}
                                    project={project}
                                    index={index}
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
                            'w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-brand-ink shadow-2xl transition-opacity duration-300 md:w-72',
                            preview ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        {preview && (
                            <img
                                src={preview}
                                alt=""
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover"
                            />
                        )}
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="mt-10 bg-brand-ink px-5 py-20 text-brand-cream md:px-10 md:py-28">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <h2 className="public-display text-[12vw] leading-[0.95] md:text-[5vw]">
                        <MaskReveal text="Have a project in mind?" />
                    </h2>
                    <MagneticButton>
                        <Link
                            href={contact.url()}
                            data-cursor="Start"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-8 py-4 text-sm font-semibold text-brand-ink"
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
