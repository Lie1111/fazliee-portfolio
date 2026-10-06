import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes/control';
import timeline from '@/routes/control/timeline';

type TimelineEntry = {
    id: number;
    type: string;
    title: string;
    organisation: string | null;
    period: string | null;
    description: string | null;
    sort_order: number;
};

export default function TimelineIndex({
    entries,
}: {
    entries: TimelineEntry[];
}) {
    const destroy = (entry: TimelineEntry) => {
        if (confirm(`Delete "${entry.title}"?`)) {
            router.delete(timeline.destroy.url({ timeline: entry.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Timeline" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Timeline"
                        description="Education, experience and journey entries"
                    />
                    <Button asChild>
                        <Link href={timeline.create()} prefetch>
                            <Plus />
                            New entry
                        </Link>
                    </Button>
                </div>

                {entries.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No timeline entries yet. Create your first one.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Organisation
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Period
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Sort
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {entries.map((entry) => (
                                    <tr
                                        key={entry.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary">
                                                {entry.type}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {entry.title}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {entry.organisation ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {entry.period ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {entry.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={timeline.edit({
                                                            timeline: entry.id,
                                                        })}
                                                        prefetch
                                                    >
                                                        <Pencil />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        destroy(entry)
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

TimelineIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Timeline',
            href: timeline.index(),
        },
    ],
};
