import { Head, Link } from '@inertiajs/react';
import {
    FolderGit2,
    History,
    Mail,
    MailWarning,
    Sparkles,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes/control';
import messages from '@/routes/control/messages';
import projects from '@/routes/control/projects';
import services from '@/routes/control/services';
import skills from '@/routes/control/skills';
import timeline from '@/routes/control/timeline';

type Stats = {
    projects: number;
    services: number;
    skills: number;
    timeline: number;
    messages: number;
    unreadMessages: number;
};

type RecentMessage = {
    id: number;
    name: string;
    email: string;
    project_type: string | null;
    read_at: string | null;
    created_at: string;
};

type StatCard = {
    title: string;
    value: number;
    href: ReturnType<typeof projects.index>;
    icon: LucideIcon;
    highlight?: boolean;
};

export default function Dashboard({
    stats,
    recentMessages,
}: {
    stats: Stats;
    recentMessages: RecentMessage[];
}) {
    const cards: StatCard[] = [
        {
            title: 'Projects',
            value: stats.projects,
            href: projects.index(),
            icon: FolderGit2,
        },
        {
            title: 'Services',
            value: stats.services,
            href: services.index(),
            icon: Wrench,
        },
        {
            title: 'Skills',
            value: stats.skills,
            href: skills.index(),
            icon: Sparkles,
        },
        {
            title: 'Timeline',
            value: stats.timeline,
            href: timeline.index(),
            icon: History,
        },
        {
            title: 'Messages',
            value: stats.messages,
            href: messages.index(),
            icon: Mail,
        },
        {
            title: 'Unread',
            value: stats.unreadMessages,
            href: messages.index(),
            icon: MailWarning,
            highlight: stats.unreadMessages > 0,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title="Control panel"
                    description="Manage your portfolio content and messages"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <Link key={card.title} href={card.href} prefetch>
                            <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <card.icon className="size-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-semibold tracking-tight">
                                        {card.value}
                                    </div>
                                    {card.highlight && (
                                        <Badge
                                            variant="destructive"
                                            className="mt-2"
                                        >
                                            Needs attention
                                        </Badge>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent messages</CardTitle>
                        <CardDescription>
                            The latest enquiries from your contact form
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentMessages.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No messages yet.
                            </p>
                        ) : (
                            <ul className="divide-y">
                                {recentMessages.map((message) => (
                                    <li key={message.id}>
                                        <Link
                                            href={messages.show({
                                                message: message.id,
                                            })}
                                            prefetch
                                            className="flex items-center justify-between gap-4 py-3 text-sm hover:text-primary"
                                        >
                                            <span className="flex min-w-0 items-center gap-2">
                                                {message.read_at === null && (
                                                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                                                )}
                                                <span className="truncate font-medium">
                                                    {message.name}
                                                </span>
                                                <span className="truncate text-muted-foreground">
                                                    {message.project_type ??
                                                        message.email}
                                                </span>
                                            </span>
                                            <span className="shrink-0 text-muted-foreground">
                                                {new Date(
                                                    message.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
