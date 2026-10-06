import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes/control';
import skills from '@/routes/control/skills';

type Skill = {
    id: number;
    name: string;
    category: string;
    sort_order: number;
};

export default function SkillsIndex({ skills: items }: { skills: Skill[] }) {
    const destroy = (skill: Skill) => {
        if (confirm(`Delete "${skill.name}"?`)) {
            router.delete(skills.destroy.url({ skill: skill.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Skills" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Skills"
                        description="Skills grouped by category on your public site"
                    />
                    <Button asChild>
                        <Link href={skills.create()} prefetch>
                            <Plus />
                            New skill
                        </Link>
                    </Button>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        No skills yet. Create your first one.
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
                                        Category
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
                                {items.map((skill) => (
                                    <tr
                                        key={skill.id}
                                        className="hover:bg-muted/40"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {skill.name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {skill.category}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {skill.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={skills.edit({
                                                            skill: skill.id,
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
                                                        destroy(skill)
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

SkillsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Skills',
            href: skills.index(),
        },
    ],
};
