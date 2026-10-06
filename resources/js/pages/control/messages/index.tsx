import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

export default function MessagesIndex({
    messages: items,
}: {
    messages: ContactMessage[];
}) {
    const destroy = (message: ContactMessage) => {
        if (confirm(`Delete the message from "${message.name}"?`)) {
            router.delete(messages.destroy.url({ message: message.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Messages" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title="Messages"
                    description="Enquiries submitted through your contact form"
                />

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No messages yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Project type
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Received
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {items.map((message) => (
                                    <tr
                                        key={message.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3">
                                            <Link
                                                href={messages.show({
                                                    message: message.id,
                                                })}
                                                prefetch
                                                className={cn(
                                                    'flex items-center gap-2 hover:text-primary',
                                                    message.read_at === null &&
                                                        'font-semibold',
                                                )}
                                            >
                                                {message.read_at === null && (
                                                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                                                )}
                                                {message.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {message.email}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {message.project_type ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(
                                                message.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={messages.show({
                                                            message: message.id,
                                                        })}
                                                        prefetch
                                                    >
                                                        <Eye />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        destroy(message)
                                                    }
                                                >
                                                    <Trash2 />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

MessagesIndex.layout = {
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
