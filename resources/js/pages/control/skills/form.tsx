import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes/control';
import skills from '@/routes/control/skills';

type Skill = {
    id: number;
    name: string;
    category: string;
    sort_order: number;
};

export default function SkillForm({ skill }: { skill: Skill | null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name ?? '',
        category: skill?.category ?? '',
        sort_order: skill?.sort_order ?? 0,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (skill) {
            put(skills.update.url({ skill: skill.id }), {
                preserveScroll: true,
            });
        } else {
            post(skills.store.url(), { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title={skill ? `Edit ${skill.name}` : 'New skill'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title={skill ? 'Edit skill' : 'New skill'}
                    description="A single skill entry"
                />

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.category} />
                        </div>
                    </div>

                    <div className="grid max-w-xs gap-2">
                        <Label htmlFor="sort_order">Sort order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={(e) =>
                                setData(
                                    'sort_order',
                                    e.target.value === ''
                                        ? 0
                                        : Number(e.target.value),
                                )
                            }
                        />
                        <InputError message={errors.sort_order} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            Save
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={skills.index()} prefetch>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SkillForm.layout = {
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
