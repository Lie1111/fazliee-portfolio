import { cn } from '@/lib/utils';
import type { Project } from '@/types/portfolio';

type Motif = 'map' | 'web' | 'people' | 'phone';

const SURFACES = [
    { bg: 'var(--color-cap)', fill: 'var(--color-paper-light)' },
    { bg: 'var(--color-peach)', fill: 'var(--color-paper-light)' },
    { bg: 'var(--color-khaki)', fill: 'var(--color-cap)' },
    { bg: 'var(--color-forest)', fill: 'var(--color-peach)' },
];

function motifFor(project: Pick<Project, 'category' | 'title'>): Motif {
    const haystack = `${project.category} ${project.title}`.toLowerCase();
    const has = (word: string) => new RegExp(`\b${word}\b`).test(haystack);

    if (has('community')) {
        return 'people';
    }

    if (haystack.includes('360') || has('unity') || has('map')) {
        return 'map';
    }

    if (has('mobile') || has('app')) {
        return 'phone';
    }

    return 'web';
}

const STROKE = {
    stroke: 'var(--color-ink)',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
} as const;

/** A 360° view: panorama rings, a horizon and a compass needle that swings on hover. */
function MapMotif({ fill }: { fill: string }) {
    return (
        <g>
            <ellipse
                cx="200"
                cy="125"
                rx="120"
                ry="78"
                fill={fill}
                {...STROKE}
            />
            <ellipse
                cx="200"
                cy="125"
                rx="78"
                ry="50"
                fill="none"
                {...STROKE}
                strokeDasharray="2 12"
            />
            <path d="M80 125 H320" fill="none" {...STROKE} />
            <g className="origin-[200px_125px] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[200deg]">
                <path
                    d="M200 82 L212 125 L200 168 L188 125 Z"
                    fill="var(--color-ink)"
                />
                <path
                    d="M200 82 L212 125 L188 125 Z"
                    fill="var(--color-peach)"
                    {...STROKE}
                    strokeWidth={3}
                />
            </g>
            <circle
                cx="200"
                cy="125"
                r="6"
                fill="var(--color-paper-light)"
                {...STROKE}
                strokeWidth={3}
            />
        </g>
    );
}

/** A browser window whose content blocks slide into place on hover. */
function WebMotif({ fill }: { fill: string }) {
    return (
        <g>
            <rect
                x="70"
                y="45"
                width="260"
                height="165"
                rx="14"
                fill={fill}
                {...STROKE}
            />
            <path d="M70 78 H330" fill="none" {...STROKE} />
            <circle cx="92" cy="62" r="5" fill="var(--color-ink)" />
            <circle cx="110" cy="62" r="5" fill="var(--color-ink)" />
            <rect
                x="92"
                y="96"
                width="110"
                height="18"
                rx="9"
                fill="var(--color-ink)"
                className="transition-transform duration-500 group-hover:translate-x-3"
            />
            <rect
                x="92"
                y="126"
                width="150"
                height="10"
                rx="5"
                fill="var(--color-ink)"
                opacity="0.35"
            />
            <rect
                x="92"
                y="144"
                width="120"
                height="10"
                rx="5"
                fill="var(--color-ink)"
                opacity="0.35"
            />
            <rect
                x="250"
                y="96"
                width="58"
                height="92"
                rx="10"
                fill="var(--color-cap)"
                {...STROKE}
                strokeWidth={3}
                className="transition-transform duration-500 group-hover:-translate-y-2"
            />
        </g>
    );
}

/** Three heads leaning together — community work. */
function PeopleMotif({ fill }: { fill: string }) {
    const people = [
        { x: 130, y: 120, delay: '0ms' },
        { x: 200, y: 105, delay: '80ms' },
        { x: 270, y: 120, delay: '160ms' },
    ];

    return (
        <g>
            {people.map((person) => (
                <g
                    key={person.x}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-3"
                    style={{ transitionDelay: person.delay }}
                >
                    <path
                        d={`M${person.x - 42} 215 C ${person.x - 40} ${person.y + 40}, ${person.x + 40} ${person.y + 40}, ${person.x + 42} 215`}
                        fill={fill}
                        {...STROKE}
                    />
                    <circle
                        cx={person.x}
                        cy={person.y}
                        r="26"
                        fill="var(--color-peach)"
                        {...STROKE}
                    />
                </g>
            ))}
        </g>
    );
}

/** A phone with a screen that lights up on hover. */
function PhoneMotif({ fill }: { fill: string }) {
    return (
        <g>
            <rect
                x="150"
                y="30"
                width="100"
                height="190"
                rx="18"
                fill={fill}
                {...STROKE}
            />
            <rect
                x="162"
                y="52"
                width="76"
                height="130"
                rx="6"
                fill="var(--color-ink)"
                opacity="0.15"
                className="transition-opacity duration-500 group-hover:opacity-40"
            />
            <path d="M188 202 H212" fill="none" {...STROKE} />
        </g>
    );
}

/**
 * Flat, line-drawn project artwork in the same style as the avatar. Used
 * whenever a project has no uploaded thumbnail.
 */
export default function ProjectCover({
    project,
    index = 0,
    className,
}: {
    project: Pick<Project, 'category' | 'title' | 'thumbnail'>;
    index?: number;
    className?: string;
}) {
    if (project.thumbnail) {
        return (
            <img
                src={project.thumbnail}
                alt=""
                loading="lazy"
                className={cn('size-full object-cover', className)}
            />
        );
    }

    const surface = SURFACES[index % SURFACES.length];
    const motif = motifFor(project);

    return (
        <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="xMidYMid slice"
            className={cn('size-full', className)}
            aria-hidden
        >
            <rect width="400" height="250" fill={surface.bg} />
            {motif === 'map' && <MapMotif fill={surface.fill} />}
            {motif === 'web' && <WebMotif fill={surface.fill} />}
            {motif === 'people' && <PeopleMotif fill={surface.fill} />}
            {motif === 'phone' && <PhoneMotif fill={surface.fill} />}
        </svg>
    );
}
