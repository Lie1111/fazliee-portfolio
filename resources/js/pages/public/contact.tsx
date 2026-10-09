import { Head, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import Avatar from '@/components/public/avatar';
import LocalClock from '@/components/public/local-clock';
import MagneticButton from '@/components/public/magnetic-button';
import { MaskReveal, Reveal } from '@/components/public/reveal';
import { cn } from '@/lib/utils';
import contactRoutes from '@/routes/contact';
import type { Profile } from '@/types/portfolio';

const PROJECT_TYPES = ['Mobile App', 'Website', '360 & Unity', 'Other'];

type ContactForm = {
    name: string;
    email: string;
    project_type: string;
    message: string;
};

function FieldError({ message }: { message?: string }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 text-sm font-medium text-red-700"
                >
                    {message}
                </motion.p>
            )}
        </AnimatePresence>
    );
}

const INPUT_CLASS =
    'w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-current placeholder:opacity-40';

export default function Contact({ profile }: { profile: Profile | null }) {
    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const form = useForm<ContactForm>({
        name: '',
        email: '',
        project_type: PROJECT_TYPES[0],
        message: '',
    });

    const isAvailable = profile?.availability === 'Available for work';
    const phoneDigits = profile?.phone?.replace(/[^\d]/g, '') ?? '';
    const whatsapp = phoneDigits ? `https://wa.me/${phoneDigits}` : null;

    const copyEmail = async () => {
        if (!profile) {
            return;
        }

        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            toast.success('Copied!', { description: profile.email });
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Could not copy — please copy it manually.');
        }
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(contactRoutes.store.url(), {
            onSuccess: () => {
                setSent(true);
                form.reset();
            },
        });
    };

    return (
        <>
            <Head title="Say Hello">
                <meta
                    name="description"
                    content={
                        profile?.intro ??
                        'Get in touch with Fazliee Aiman about your next project.'
                    }
                />
            </Head>

            {/* Hero */}
            <section className="bg-forest px-5 pt-32 pb-16 text-paper md:px-10 md:pt-40 md:pb-20">
                <div className="mx-auto max-w-7xl">
                    <h1 className="public-display text-[19vw] leading-[0.85] md:text-[11vw]">
                        <MaskReveal text="Say hello" />
                    </h1>
                    <Reveal delay={0.2} className="mt-8 max-w-xl">
                        <p className="text-sm leading-relaxed opacity-85">
                            Have a project, a rough idea or just want to chat?
                            Drop me a note and I will get back to you as soon as
                            I can.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Form + details */}
            <section className="bg-forest px-5 pb-24 text-paper md:px-10 md:pb-32">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Details */}
                    <div className="lg:col-span-5">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2 text-xs tracking-wide">
                                    <span
                                        className={cn(
                                            'size-2 rounded-full',
                                            isAvailable
                                                ? 'bg-emerald-400'
                                                : 'bg-peach',
                                        )}
                                    />
                                    {profile?.availability ??
                                        'Open to new work'}
                                </span>
                                {profile?.location && (
                                    <span className="inline-flex items-center gap-2 text-xs opacity-70">
                                        <MapPin className="size-3.5" />
                                        {profile.location}
                                    </span>
                                )}
                            </div>
                        </Reveal>

                        <Reveal delay={0.1} className="mt-10 space-y-3">
                            {profile?.email && (
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    data-cursor="Copy"
                                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-paper/25 px-5 py-4 text-left transition-colors hover:border-paper hover:bg-paper/5"
                                >
                                    <span className="flex items-center gap-4">
                                        <Mail className="size-5 opacity-70" />
                                        <span className="text-sm md:text-base">
                                            {profile.email}
                                        </span>
                                    </span>
                                    {copied ? (
                                        <Check className="size-4 text-peach" />
                                    ) : (
                                        <span className="text-sm opacity-60">
                                            Copy
                                        </span>
                                    )}
                                </button>
                            )}

                            {profile?.phone && (
                                <a
                                    href={whatsapp ?? `tel:${phoneDigits}`}
                                    target={whatsapp ? '_blank' : undefined}
                                    rel={whatsapp ? 'noreferrer' : undefined}
                                    data-cursor="Chat"
                                    className="flex items-center gap-4 rounded-2xl border-2 border-paper/25 px-5 py-4 transition-colors hover:border-paper hover:bg-paper/5"
                                >
                                    <Phone className="size-5 opacity-70" />
                                    <span className="text-sm md:text-base">
                                        {profile.phone}
                                    </span>
                                </a>
                            )}

                            {profile?.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-cursor="Open"
                                    className="flex items-center gap-4 rounded-2xl border-2 border-paper/25 px-5 py-4 transition-colors hover:border-paper hover:bg-paper/5"
                                >
                                    <Linkedin className="size-5 opacity-70" />
                                    <span className="text-sm md:text-base">
                                        LinkedIn
                                    </span>
                                </a>
                            )}

                            {profile?.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-cursor="Open"
                                    className="flex items-center gap-4 rounded-2xl border-2 border-paper/25 px-5 py-4 transition-colors hover:border-paper hover:bg-paper/5"
                                >
                                    <Github className="size-5 opacity-70" />
                                    <span className="text-sm md:text-base">
                                        GitHub
                                    </span>
                                </a>
                            )}
                        </Reveal>

                        <Reveal delay={0.2} className="mt-10">
                            <p className="text-sm opacity-60">Local time</p>
                            <p className="public-display mt-2 text-3xl">
                                <LocalClock withLabel />
                            </p>
                        </Reveal>
                    </div>

                    {/* Form card */}
                    <Reveal delay={0.1} className="lg:col-span-7">
                        <div className="public-outline relative overflow-hidden rounded-3xl bg-paper-light p-6 text-ink md:p-12">
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex flex-col items-center py-10 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 220,
                                                damping: 16,
                                                delay: 0.1,
                                            }}
                                            className="w-40 md:w-52"
                                        >
                                            <Avatar
                                                bubble
                                                bubbleDelay={0.3}
                                                lines={['Got it, thanks!']}
                                                follow={false}
                                                interactive={false}
                                                alt=""
                                            />
                                        </motion.div>
                                        <h2 className="public-display mt-7 text-4xl md:text-5xl">
                                            Message sent
                                        </h2>
                                        <p className="mt-4 max-w-sm text-sm opacity-70">
                                            Thanks for reaching out — I&apos;ll
                                            get back to you as soon as I can.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setSent(false)}
                                            data-cursor="Again"
                                            className="mt-8 inline-flex items-center gap-2 rounded-full border border-2 border-ink px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={submit}
                                        className="space-y-8"
                                    >
                                        <div className="grid gap-8 md:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm font-semibold"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={form.data.name}
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'name',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Your name"
                                                    className={cn(
                                                        INPUT_CLASS,
                                                        'mt-3',
                                                        form.errors.name
                                                            ? 'border-red-700'
                                                            : 'border-ink/30 focus:border-ink',
                                                    )}
                                                />
                                                <FieldError
                                                    message={form.errors.name}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="text-sm font-semibold"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={form.data.email}
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'email',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="you@example.com"
                                                    className={cn(
                                                        INPUT_CLASS,
                                                        'mt-3',
                                                        form.errors.email
                                                            ? 'border-red-700'
                                                            : 'border-ink/30 focus:border-ink',
                                                    )}
                                                />
                                                <FieldError
                                                    message={form.errors.email}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-sm font-semibold">
                                                Project type
                                            </span>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {PROJECT_TYPES.map((type) => {
                                                    const active =
                                                        form.data
                                                            .project_type ===
                                                        type;

                                                    return (
                                                        <button
                                                            key={type}
                                                            type="button"
                                                            onClick={() =>
                                                                form.setData(
                                                                    'project_type',
                                                                    type,
                                                                )
                                                            }
                                                            data-cursor="Pick"
                                                            className={cn(
                                                                'rounded-full border px-4 py-2 text-xs tracking-wide transition-colors',
                                                                active
                                                                    ? 'border-ink bg-ink text-paper'
                                                                    : 'border-ink/30 hover:border-ink',
                                                            )}
                                                        >
                                                            {type}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <FieldError
                                                message={
                                                    form.errors.project_type
                                                }
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="text-sm font-semibold"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                value={form.data.message}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'message',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Tell me a bit about your project…"
                                                className={cn(
                                                    INPUT_CLASS,
                                                    'mt-3 resize-none',
                                                    form.errors.message
                                                        ? 'border-red-700'
                                                        : 'border-ink/30 focus:border-ink',
                                                )}
                                            />
                                            <FieldError
                                                message={form.errors.message}
                                            />
                                        </div>

                                        <MagneticButton className="block">
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                data-cursor="Send"
                                                className="group inline-flex items-center gap-3 rounded-full bg-cap px-8 py-4 font-semibold text-paper transition-opacity disabled:opacity-60"
                                            >
                                                {form.processing ? (
                                                    'Sending…'
                                                ) : (
                                                    <>
                                                        Send message
                                                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </MagneticButton>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* WhatsApp CTA */}
            {profile?.phone && (
                <section className="bg-forest px-5 pb-24 md:px-10 md:pb-32">
                    <Reveal className="mx-auto max-w-7xl">
                        <div className="public-outline flex flex-col items-start justify-between gap-8 rounded-3xl bg-peach px-6 py-14 text-ink md:flex-row md:items-center md:px-14">
                            <h2 className="public-display text-[clamp(2.25rem,5vw,4.5rem)]">
                                Prefer to chat?
                            </h2>
                            <MagneticButton className="shrink-0">
                                <a
                                    href={whatsapp ?? `tel:${phoneDigits}`}
                                    target={whatsapp ? '_blank' : undefined}
                                    rel={whatsapp ? 'noreferrer' : undefined}
                                    data-cursor="Chat"
                                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-paper"
                                >
                                    Message me on WhatsApp
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </MagneticButton>
                        </div>
                    </Reveal>
                </section>
            )}
        </>
    );
}
