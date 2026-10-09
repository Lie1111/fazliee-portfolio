import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CustomCursor from '@/components/public/custom-cursor';
import PageTransition from '@/components/public/page-transition';
import Preloader from '@/components/public/preloader';
import SiteFooter from '@/components/public/site-footer';
import SiteNav from '@/components/public/site-nav';
import SmoothScroll from '@/components/public/smooth-scroll';
import type { FlashProps, Profile } from '@/types/portfolio';

/** Pages whose hero sits on the dark forest background. */
const INVERTED_PAGES = ['public/what-i-do', 'public/contact'];

/**
 * Wraps every public page: smooth scrolling, custom cursor, preloader, colour
 * wipe transitions, grain overlay, navigation and footer.
 */
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const page = usePage<{ profile: Profile | null; flash: FlashProps }>();
    const component = page.component;
    const profile = page.props.profile;
    const flash = page.props.flash;

    // Surface flash messages as toasts.
    useEffect(() => {
        const message = flash?.toast?.message;

        if (!message) {
            return;
        }

        if (flash.toast?.type === 'error') {
            toast.error(message);
        } else if (flash.toast?.type === 'info') {
            toast.info(message);
        } else {
            toast.success(message);
        }
    }, [flash]);

    const invert = INVERTED_PAGES.includes(component);

    return (
        <div className="public-site public-grain relative min-h-screen bg-paper text-ink antialiased">
            <SmoothScroll />
            <CustomCursor />
            <Preloader />
            <PageTransition />

            {profile && <SiteNav brand={profile.brand_name} invert={invert} />}

            <main>{children}</main>

            {profile && <SiteFooter profile={profile} />}
        </div>
    );
}
