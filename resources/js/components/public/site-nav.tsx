import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AVATAR_SRC } from '@/components/public/avatar';
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
 * Public site navigation: avatar brand mark and letter-roll links.
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
                'fixed inset-x-0 top-0 z-50 px-5 py-4 backdrop-blur-md transition-colors md:px-10',
                invert ? 'bg-forest/85 text-paper' : 'bg-paper/85 text-ink',
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <Link
                    href={home.url()}
                    className="public-display group/nav relative z-50 inline-flex items-center gap-2.5 text-xl"
                    data-cursor="Home"
                >
                    <img
                        src={AVATAR_SRC}
                        alt=""
                        aria-hidden
                        className="size-9 rounded-full border-2 border-current object-cover transition-transform duration-500 group-hover/nav:-rotate-12"
                    />
                    {brand}
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <nav className="flex items-center gap-7">
                        {ITEMS.map((item) => {
                            const active = item.match(url);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="group/nav relative text-sm font-semibold"
                                    aria-current={active ? 'page' : undefined}
                                >
                                    <RollText label={item.label} />
                                    <span
                                        aria-hidden
                                        className={cn(
                                            'absolute -bottom-1.5 left-0 h-0.5 w-full origin-left rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                                            active
                                                ? 'scale-x-100'
                                                : 'scale-x-0 group-hover/nav:scale-x-100',
                                        )}
                                    />
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
                    {open ? (
                        <X className="size-6" />
                    ) : (
                        <Menu className="size-6" />
                    )}
                </button>
            </div>

            {open && (
                <div
                    className={cn(
                        'fixed inset-0 z-40 flex flex-col justify-center gap-2 px-8',
                        'bg-forest text-paper',
                    )}
                >
                    {ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="public-display text-5xl"
                            aria-current={item.match(url) ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <LocalClock withLabel className="mt-6 text-sm opacity-70" />
                </div>
            )}
        </header>
    );
}
