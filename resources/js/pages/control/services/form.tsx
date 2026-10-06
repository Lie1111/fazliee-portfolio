import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

export default function ServiceForm({ service }: { service: Service | null }) {
    const { data, setData, post, put, processing, errors, transform } = useForm(
        {
            number: service?.number ?? '',
            title: service?.title ?? '',
            description: service?.description ?? '',
            icon: service?.icon ?? '',
            items: (service?.items ?? []).join(', '),
            sort_order: service?.sort_order ?? 0,
        },
    );

    const submit = (event: FormEvent) => {
        event.preventDefault();

        transform((form) => ({
            ...form,
            items: form.items
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
        }));

        if (service) {
            put(services.update.url({ service: service.id }), {
                preserveScroll: true,
            });
        } else {
            post(services.store.url(), { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title={service ? `Edit ${service.title}` : 'New service'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title={service ? 'Edit service' : 'New service'}
                    description="A service shown on your public site"
                />

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="number">Number</Label>
                            <Input
                                id="number"
                                value={data.number}
                                onChange={(e) =>
                                    setData('number', e.target.value)
                                }
                                placeholder="01"
                                required
                            />
                            <InputError message={errors.number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.title} />
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
                            required
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Input
                                id="icon"
                                value={data.icon}
                                onChange={(e) =>
                                    setData('icon', e.target.value)
                                }
                            />
                            <InputError message={errors.icon} />
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
                        <Label htmlFor="items">Items</Label>
                        <Input
                            id="items"
                            value={data.items}
                            onChange={(e) => setData('items', e.target.value)}
                            placeholder="Branding, UI design, Development"
                        />
                        <p className="text-xs text-muted-foreground">
                            Separate each item with a comma.
                        </p>
                        <InputError message={errors.items} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            Save
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={services.index()} prefetch>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

ServiceForm.layout = {
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
