import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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

export default function TimelineForm({
    entry,
    types,
}: {
    entry: TimelineEntry | null;
    types: string[];
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        type: entry?.type ?? types[0] ?? '',
        title: entry?.title ?? '',
        organisation: entry?.organisation ?? '',
        period: entry?.period ?? '',
        description: entry?.description ?? '',
        sort_order: entry?.sort_order ?? 0,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (entry) {
            put(timeline.update.url({ timeline: entry.id }), {
                preserveScroll: true,
            });
        } else {
            post(timeline.store.url(), { preserveScroll: true });
        }
    };

    return (
        <>
            <Head
                title={entry ? `Edit ${entry.title}` : 'New timeline entry'}
            />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title={entry ? 'Edit timeline entry' : 'New timeline entry'}
                    description="An education, experience or journey entry"
                />

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData('type', value)
                                }
                            >
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {types.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>

                        <div className="grid gap-2">
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
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="organisation">Organisation</Label>
                            <Input
                                id="organisation"
                                value={data.organisation}
                                onChange={(e) =>
                                    setData('organisation', e.target.value)
                                }
                            />
                            <InputError message={errors.organisation} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="period">Period</Label>
                            <Input
                                id="period"
                                value={data.period}
                                onChange={(e) =>
                                    setData('period', e.target.value)
                                }
                                placeholder="2022 — Present"
                            />
                            <InputError message={errors.period} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            rows={4}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            Save
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={timeline.index()} prefetch>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TimelineForm.layout = {
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
