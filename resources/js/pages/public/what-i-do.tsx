import { Head, Link } from '@inertiajs/react';
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
} from 'framer-motion';
import {
    ArrowRight,
    Boxes,
    Code,
    Globe,
    Layers,
    Palette,
    PenTool,
    Plus,
    Smartphone,
    Wrench,
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { ComponentType } from 'react';
import MagneticButton from '@/components/public/magnetic-button';
import { MaskReveal, Reveal } from '@/components/public/reveal';
import { cn } from '@/lib/utils';
import { contact } from '@/routes';
import type { Service } from '@/types/portfolio';

type IconComponent = ComponentType<{ className?: string }>;

const FALLBACK_ICONS: IconComponent[] = [Smartphone, Boxes, Globe, Wrench];

const ICON_ALIASES: Record<string, IconComponent> = {
    smartphone: Smartphone,
    mobile: Smartphone,
    app: Smartphone,
    box: Boxes,
    boxes: Boxes,
    package: Boxes,
    layers: Layers,
    globe: Globe,
    web: Globe,
    website: Globe,
    browser: Globe,
    wrench: Wrench,
    tool: Wrench,
    tools: Wrench,
    code: Code,
    dev: Code,
    pen: PenTool,
    'pen-tool': PenTool,
    design: PenTool,
    palette: Palette,
    art: Palette,
};

/** Resolves a lucide icon by name, falling back to a sensible default by index. */
function resolveServiceIcon(icon: string | null, index: number): IconComponent {
    const key = icon?.trim().toLowerCase();
    const aliased = key ? ICON_ALIASES[key] : undefined;

    if (aliased) {
        return aliased;
    }

    return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

const PROCESS: { name: string; description: string }[] = [
    {
        name: 'Understand',
        description:
            'We talk through your goals, your users and the constraints.',
    },
    {
        name: 'Design',
        description: 'I map the flow and shape the look, screen by screen.',
    },
    {
        name: 'Build',
        description: 'Clean, tested code shipped in small, reviewable chunks.',
    },
    {
        name: 'Launch',
        description:
            'We go live, measure what matters and refine after release.',
    },
];

const ENGAGEMENTS: { label: string; description: string }[] = [
    {
        label: 'Freelance',
        description:
            'Project-based work — I scope, build and ship the whole thing.',
    },
    {
        label: 'Internship',
        description:
            'Hands-on learning inside a real team, eager to grow fast.',
    },
    {
        label: 'Full-time',
        description:
            'Ready to join a product team and own features end to end.',
    },
];

const FAQ: { question: string; answer: string }[] = [
    {
        question: 'What kind of projects do you take on?',
        answer: 'Mobile apps, marketing sites, small web apps and interactive experiences. If it involves thoughtful UI and clean code, I am interested.',
    },
    {
        question: 'How do we start working together?',
        answer: 'Send a short note about your idea through the contact page. We have a quick call to align on scope, timeline and budget, then I share a simple plan.',
    },
    {
        question: 'How long does a typical project take?',
        answer: 'A landing page can ship in a week or two; a full app usually takes four to eight weeks depending on scope. I work in small, reviewable milestones so you always see progress.',
    },
    {
        question: 'Do you work remotely?',
        answer: 'Yes. I am based in Malaysia (MYT) and collaborate remotely with teams across time zones, with regular async updates and calls when needed.',
    },
];

function ServiceRow({
    service,
    index,
    isOpen,
    onToggle,
}: {
    service: Service;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const Icon = resolveServiceIcon(service.icon, index);
    const items = service.items ?? [];

    return (
        <div
            className={cn(
                'overflow-hidden rounded-3xl border-2 transition-colors duration-300',
                isOpen
                    ? 'border-ink bg-paper-light text-ink'
                    : 'border-paper/25 hover:border-paper',
            )}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                data-cursor={isOpen ? 'Close' : 'Open'}
                className="group flex w-full items-center gap-5 p-6 text-left md:gap-8 md:p-9"
            >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-current md:size-14">
                    <Icon className="size-5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12 md:size-6" />
                </span>

                <span className="public-display flex-1 text-2xl md:text-4xl">
                    {service.title}
                </span>

                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                        'inline-flex size-11 shrink-0 items-center justify-center rounded-full',
                        isOpen ? 'bg-ink text-paper' : 'bg-paper text-ink',
                    )}
                >
                    <Plus className="size-5" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-8 md:px-9 md:pb-10 md:pl-[7.5rem]">
                            <p className="max-w-2xl text-sm leading-relaxed opacity-75">
                                {service.description}
                            </p>

                            {items.length > 0 && (
                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-paper/25 px-4 py-1.5 text-xs tracking-wide"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProcessTimeline() {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.85', 'end 0.35'],
    });
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={ref} className="relative mt-14">
            {/* Desktop: horizontal connector */}
            <div className="absolute top-7 right-7 left-7 hidden h-px bg-paper/20 md:block">
                <motion.div
                    style={{ scaleX }}
                    className="h-full w-full origin-left bg-peach"
                />
            </div>

            {/* Mobile: vertical connector */}
            <div className="absolute top-0 bottom-0 left-7 w-px bg-paper/20 md:hidden">
                <motion.div
                    style={{ scaleY }}
                    className="h-full w-full origin-top bg-peach"
                />
            </div>

            <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
                {PROCESS.map((step, index) => (
                    <li
                        key={step.name}
                        className="relative flex gap-5 md:block"
                    >
                        <span className="public-display relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-paper bg-cap text-xl">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="md:mt-6">
                            <h3 className="public-display text-2xl">
                                {step.name}
                            </h3>
                            <p className="mt-2 max-w-xs text-sm opacity-70">
                                {step.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-paper/20">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                data-cursor={open ? 'Close' : 'Open'}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
                <span className="public-display text-xl md:text-2xl">
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors group-hover:bg-paper group-hover:text-ink"
                >
                    <Plus className="size-4" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                    >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed opacity-75">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function WhatIDo({ services }: { services: Service[] }) {
    const [openId, setOpenId] = useState<number | null>(
        services[0]?.id ?? null,
    );

    const toggle = (id: number) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <>
            <Head title="What I Do" />

            {/* Hero */}
            <section className="bg-forest px-5 pt-32 pb-16 text-paper md:px-10 md:pt-40 md:pb-24">
                <div className="mx-auto max-w-7xl">
                    <h1 className="public-display text-[18vw] leading-[0.85] md:text-[10vw]">
                        <MaskReveal text="What I do" />
                    </h1>
                    <Reveal delay={0.2} className="mt-8 max-w-xl">
                        <p className="text-sm leading-relaxed opacity-85">
                            I design and build digital products end to end —
                            mobile apps, websites and interactive experiences.
                            Here is what I can help you with.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Services accordion */}
            <section className="bg-forest px-5 pb-24 text-paper md:px-10 md:pb-32">
                <div className="mx-auto max-w-7xl space-y-5">
                    {services.map((service, index) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                            index={index}
                            isOpen={openId === service.id}
                            onToggle={() => toggle(service.id)}
                        />
                    ))}
                    {services.length === 0 && (
                        <p className="text-sm opacity-60">
                            Services will appear here once added in the control
                            panel.
                        </p>
                    )}
                </div>
            </section>

            {/* Process timeline */}
            <section className="border-t border-paper/15 bg-forest px-5 py-24 text-paper md:px-10 md:py-32">
                <div className="mx-auto max-w-7xl">
                    <h2 className="public-display text-[14vw] leading-none md:text-[7vw]">
                        <MaskReveal text="How it works" />
                    </h2>
                    <ProcessTimeline />
                </div>
            </section>

            {/* Work with me */}
            <section className="bg-forest px-5 pb-24 text-paper md:px-10 md:pb-32">
                <Reveal className="mx-auto max-w-7xl">
                    <div className="public-outline rounded-3xl bg-paper-light p-8 text-ink md:p-14">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <h2 className="public-display text-4xl md:text-6xl">
                                Work with me
                            </h2>
                            <p className="max-w-sm text-sm opacity-70">
                                Pick the setup that fits — each one starts with
                                a conversation.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {ENGAGEMENTS.map((item) => (
                                <div
                                    key={item.label}
                                    className="border-t-2 border-ink pt-6"
                                >
                                    <h3 className="public-display text-3xl">
                                        {item.label}
                                    </h3>
                                    <p className="mt-3 text-sm opacity-70">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* FAQ */}
            <section className="border-t border-paper/15 bg-forest px-5 py-24 text-paper md:px-10 md:py-32">
                <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <h2 className="public-display text-4xl md:text-6xl">
                            FAQ
                        </h2>
                        <p className="mt-4 max-w-xs text-sm opacity-70">
                            Still curious? The short answers are below — or just
                            say hello.
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        {FAQ.map((item) => (
                            <FaqItem
                                key={item.question}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-forest px-5 pb-24 md:px-10 md:pb-32">
                <Reveal className="mx-auto max-w-7xl">
                    <div className="public-outline rounded-3xl bg-peach px-6 py-16 text-ink md:px-16 md:py-24">
                        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                            <div>
                                <h2 className="public-display text-[12vw] leading-[0.9] md:text-[6vw]">
                                    <MaskReveal text="Ready when you are" />
                                </h2>
                                <p className="mt-6 max-w-md text-sm opacity-80">
                                    Have an idea, a brief or just a rough
                                    thought? Tell me about it and let us make it
                                    real.
                                </p>
                            </div>
                            <MagneticButton className="shrink-0">
                                <Link
                                    href={contact.url()}
                                    data-cursor="Start"
                                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper"
                                >
                                    Start a project
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
