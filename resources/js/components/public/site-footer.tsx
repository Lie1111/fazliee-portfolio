import { Link } from '@inertiajs/react';
import { ArrowUp, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import LocalClock from '@/components/public/local-clock';
import MagneticButton from '@/components/public/magnetic-button';
import { about, contact, home, whatIDo } from '@/routes';
import work from '@/routes/work';
import type { Profile } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const NAV = [
    { label: 'Home', href: home.url() },
    { label: 'Work', href: work.index.url() },
    { label: 'What I Do', href: whatIDo.url() },
    { label: 'About', href: about.url() },
    { label: 'Contact', href: contact.url() },
];

/**
 * Public site footer: click-to-copy email, social links, local time and a
 * back-to-top control.
 */
export default function SiteFooter({
    profile,
    className,
}: {
    profile: Profile;
    className?: string;
}) {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            toast.success('Copied!', { description: profile.email });
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Could not copy — please copy it manually.');
        }
    };

    return (
        <footer
            className={cn(
                'relative overflow-hidden bg-brand-ink px-5 pt-20 pb-10 text-brand-cream md:px-10',
                className,
            )}
        >
            <div className="mx-auto max-w-7xl">
                <p className="public-display text-[13vw] leading-[0.85] md:text-[8vw]">
                    Let&apos;s talk
                </p>

                <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <p className="max-w-md text-sm opacity-70">
                            {profile.availability === 'Available for work'
                                ? "Currently open to freelance, internship and full-time roles. Say hello — I'd love to hear about your idea."
                                : profile.intro}
                        </p>
                        <MagneticButton className="mt-6">
                            <button
                                type="button"
                                onClick={copyEmail}
                                data-cursor="Copy"
                                className="group inline-flex items-center gap-3 rounded-full border border-current/30 px-6 py-3 text-left transition-colors hover:bg-current/10"
                            >
                                <span className="text-lg font-semibold">
                                    {profile.email}
                                </span>
                                {copied ? (
                                    <Check className="size-4 text-brand-yellow" />
                                ) : (
                                    <span className="text-xs tracking-widest uppercase opacity-60">
                                        Copy
                                    </span>
                                )}
                            </button>
                        </MagneticButton>
                    </div>

                    <nav className="flex flex-col gap-2 text-sm">
                        <span className="mb-2 text-xs tracking-[0.2em] uppercase opacity-50">
                            Explore
                        </span>
                        {NAV.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="w-fit transition-opacity hover:opacity-60"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-2 text-sm">
                        <span className="mb-2 text-xs tracking-[0.2em] uppercase opacity-50">
                            Elsewhere
                        </span>
                        {profile.linkedin && (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="w-fit transition-opacity hover:opacity-60"
                            >
                                LinkedIn
                            </a>
                        )}
                        {profile.github && (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                                className="w-fit transition-opacity hover:opacity-60"
                            >
                                GitHub
                            </a>
                        )}
                        {profile.phone && (
                            <a
                                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                                className="w-fit transition-opacity hover:opacity-60"
                            >
                                {profile.phone}
                            </a>
                        )}
                        {profile.resume_url && (
                            <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-fit transition-opacity hover:opacity-60"
                            >
                                Download resume
                            </a>
                        )}
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-current/15 pt-6 text-xs tracking-[0.15em] uppercase opacity-70 md:flex-row md:items-center">
                    <p>
                        © {new Date().getFullYear()} {profile.brand_name}
                        {profile.location ? ` · ${profile.location}` : ''}
                    </p>
                    <div className="flex items-center gap-6">
                        <LocalClock withLabel />
                        <button
                            type="button"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                            className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                        >
                            <ArrowUp className="size-3.5" />
                            Back to top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
