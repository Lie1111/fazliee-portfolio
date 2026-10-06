import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    FolderGit2,
    History,
    LayoutGrid,
    Mail,
    Sparkles,
    User,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/control';
import messages from '@/routes/control/messages';
import { edit as editProfile } from '@/routes/control/profile';
import projects from '@/routes/control/projects';
import services from '@/routes/control/services';
import skills from '@/routes/control/skills';
import timeline from '@/routes/control/timeline';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Profile',
        href: editProfile(),
        icon: User,
    },
    {
        title: 'Projects',
        href: projects.index(),
        icon: FolderGit2,
    },
    {
        title: 'Services',
        href: services.index(),
        icon: Briefcase,
    },
    {
        title: 'Skills',
        href: skills.index(),
        icon: Sparkles,
    },
    {
        title: 'Timeline',
        href: timeline.index(),
        icon: History,
    },
    {
        title: 'Messages',
        href: messages.index(),
        icon: Mail,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
