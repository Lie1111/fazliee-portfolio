import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import projects from '@/routes/control/projects';
import { dashboard } from '@/routes/control';

type Project = {
    id: number;
    title: string;
    slug: string;
    category: string;
    client: string | null;
    year: string | null;
    featured: boolean;
    sort_order: number;
};

export default function ProjectsIndex({
    projects: items,
}: {
    projects: Project[];
}) {
    const destroy = (project: Project) => {
        if (confirm(`Delete "${project.title}"?`)) {
            router.delete(projects.destroy.url({ project: project.slug }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Projects"
                        description="Case studies and work shown on your public site"
                    />
                    <Button asChild>
                        <Link href={projects.create()} prefetch>
                            <Plus />
                            New project
                        </Link>
                    </Button>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No projects yet. Create your first one.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Client
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Year
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
                                {items.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    {project.title}
                                                </span>
                                                {project.featured && (
                                                    <Badge variant="secondary">
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.category}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.client ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.year ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {project.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={projects.edit({
                                                            project:
                                                                project.slug,
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
                                                        destroy(project)
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

ProjectsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Projects',
            href: projects.index(),
        },
    ],
};
