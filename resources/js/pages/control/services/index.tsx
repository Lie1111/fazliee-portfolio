import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes/control';
import services from '@/routes/control/services';

type Service = {
    id: number;
    number: string;
    title: string;
    description: string;
    icon: string | null;
    items: string[] | null;
    sort_order: number;
};

export default function ServicesIndex({
    services: items,
}: {
    services: Service[];
}) {
    const destroy = (service: Service) => {
        if (confirm(`Delete "${service.title}"?`)) {
            router.delete(services.destroy.url({ service: service.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Services" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Services"
                        description="The services offered on your public site"
                    />
                    <Button asChild>
                        <Link href={services.create()} prefetch>
                            <Plus />
                            New service
                        </Link>
                    </Button>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No services yet. Create your first one.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Icon
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
                                {items.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.number}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {service.title}
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                                            {service.description}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.icon ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={services.edit({
                                                            service: service.id,
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
                                                        destroy(service)
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

ServicesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Services',
            href: services.index(),
        },
    ],
};
