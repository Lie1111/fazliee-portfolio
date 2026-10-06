import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import LocalClock from '@/components/public/local-clock';
import { about, contact, home, whatIDo } from '@/routes';
import work from '@/routes/work';
import { cn } from '@/lib/utils';

type NavItem = {
    label: string;
    href: string;
    match: (url: string) => boolean;
};

const ITEMS: NavItem[] = [
    {
        label: 'Home',
        href: home.url(),
        match: (url) => url === '/',
    },
    {
        label: 'Work',
        href: work.index.url(),
        match: (url) => url.startsWith('/work'),
    },
    {
        label: 'What I Do',
        href: whatIDo.url(),
        match: (url) => url.startsWith('/what-i-do'),
    },
    {
        label: 'About',
        href: about.url(),
        match: (url) => url.startsWith('/about'),
    },
    {
        label: 'Contact',
        href: contact.url(),
        match: (url) => url.startsWith('/contact'),
    },
];

function RollText({ label }: { label: string }) {
    return (
        <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:-translate-y-full">
                {label}
            </span>
            <span
                aria-hidden
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:translate-y-0"
            >
                {label}
            </span>
        </span>
    );
}

/**
 * Public site navigation: brand mark, live MYT clock and letter-roll links.
 * Collapses to a full-screen sheet on small screens.
 */
export default function SiteNav({
    brand = 'Fazliee Aiman',
    invert = false,
}: {
    brand?: string;
    invert?: boolean;
}) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [url]);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 px-4 py-5 md:px-8 backdrop-blur-md',
                invert
                    ? 'bg-brand-red/80 text-brand-cream'
                    : 'bg-brand-cream/80 text-brand-ink',
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <Link
                    href={home.url()}
                    className="public-display group/nav relative z-50 inline-flex items-center gap-2 text-lg"
                    data-cursor="Home"
                >
                    <span className="inline-block size-2.5 rounded-full bg-brand-yellow" />
                    {brand}
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <LocalClock className="text-xs tracking-[0.2em] opacity-70" />
                    <nav className="flex items-center gap-7">
                        {ITEMS.map((item) => {
                            const active = item.match(url);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="group/nav text-xs font-semibold tracking-[0.18em] uppercase"
                                    aria-current={active ? 'page' : undefined}
                                >
                                    <span className={cn(active && 'text-brand-yellow')}>
                                        <RollText label={item.label} />
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    className="relative z-50 md:hidden"
                >
                    {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </div>

            {open && (
                <div
                    className={cn(
                        'fixed inset-0 z-40 flex flex-col justify-center gap-2 px-8',
                        invert ? 'bg-brand-ink text-brand-cream' : 'bg-brand-red text-brand-cream',
                    )}
                >
                    {ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="public-display text-5xl"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <LocalClock className="mt-6 text-xs tracking-[0.2em] opacity-70" />
                </div>
            )}
        </header>
    );
}
