import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes/control';
import messages from '@/routes/control/messages';

type ContactMessage = {
    id: number;
    name: string;
    email: string;
    project_type: string | null;
    message: string;
    read_at: string | null;
    created_at: string;
};

export default function MessageShow({ message }: { message: ContactMessage }) {
    const destroy = () => {
        if (confirm(`Delete the message from "${message.name}"?`)) {
            router.delete(messages.destroy.url({ message: message.id }));
        }
    };

    return (
        <>
            <Head title={`Message from ${message.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title={`Message from ${message.name}`}
                        description={`Received ${new Date(
                            message.created_at,
                        ).toLocaleString()}`}
                    />
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <a href={`mailto:${message.email}`}>
                                <Mail />
                                Reply
                            </a>
                        </Button>
                        <Button variant="destructive" onClick={destroy}>
                            <Trash2 />
                            Delete
                        </Button>
                    </div>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-muted-foreground">Name</dt>
                                <dd className="font-medium">{message.name}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Email</dt>
                                <dd className="font-medium">
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="hover:text-primary hover:underline"
                                    >
                                        {message.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">
                                    Project type
                                </dt>
                                <dd className="font-medium">
                                    {message.project_type ?? '—'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">
                                    Status
                                </dt>
                                <dd className="font-medium">
                                    {message.read_at ? 'Read' : 'Unread'}
                                </dd>
                            </div>
                        </dl>

                        <div>
                            <dt className="text-muted-foreground">Message</dt>
                            <dd className="mt-1 whitespace-pre-wrap">
                                {message.message}
                            </dd>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <Button asChild variant="ghost">
                        <Link href={messages.index()} prefetch>
                            <ArrowLeft />
                            Back to messages
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

MessageShow.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Messages',
            href: messages.index(),
        },
    ],
};
