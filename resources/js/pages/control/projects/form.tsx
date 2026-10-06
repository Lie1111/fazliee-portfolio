import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes/control';
import projects from '@/routes/control/projects';

type ProjectResult = {
    label: string;
    value: string;
};

type Project = {
    id: number;
    title: string;
    slug: string;
    category: string;
    client: string | null;
    year: string | null;
    role: string | null;
    tools: string[] | null;
    summary: string;
    challenge: string | null;
    process: string | null;
    solution: string | null;
    results: ProjectResult[] | null;
    thumbnail: string | null;
    hero_media: string | null;
    demo_url: string | null;
    badge: string | null;
    featured: boolean;
    sort_order: number;
};

export default function ProjectForm({ project }: { project: Project | null }) {
    const { data, setData, post, put, processing, errors, transform } = useForm(
        {
            title: project?.title ?? '',
            slug: project?.slug ?? '',
            category: project?.category ?? '',
            client: project?.client ?? '',
            year: project?.year ?? '',
            role: project?.role ?? '',
            tools: (project?.tools ?? []).join(', '),
            summary: project?.summary ?? '',
            challenge: project?.challenge ?? '',
            process: project?.process ?? '',
            solution: project?.solution ?? '',
            results: (project?.results ?? []) as ProjectResult[],
            thumbnail: project?.thumbnail ?? '',
            hero_media: project?.hero_media ?? '',
            demo_url: project?.demo_url ?? '',
            badge: project?.badge ?? '',
            featured: project?.featured ?? false,
            sort_order: project?.sort_order ?? 0,
        },
    );

    const updateResult = (
        index: number,
        key: keyof ProjectResult,
        value: string,
    ) => {
        setData(
            'results',
            data.results.map((result, i) =>
                i === index ? { ...result, [key]: value } : result,
            ),
        );
    };

    const addResult = () => {
        setData('results', [...data.results, { label: '', value: '' }]);
    };

    const removeResult = (index: number) => {
        setData(
            'results',
            data.results.filter((_, i) => i !== index),
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        transform((form) => ({
            ...form,
            tools: form.tools
                .split(',')
                .map((tool) => tool.trim())
                .filter(Boolean),
        }));

        if (project) {
            put(projects.update.url({ project: project.slug }), {
                preserveScroll: true,
            });
        } else {
            post(projects.store.url(), { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title={project ? `Edit ${project.title}` : 'New project'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title={project ? 'Edit project' : 'New project'}
                    description="Case study details shown on your public site"
                />

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
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

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) =>
                                    setData('slug', e.target.value)
                                }
                                placeholder="auto from title"
                            />
                            <InputError message={errors.slug} />
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

                        <div className="grid gap-2">
                            <Label htmlFor="client">Client</Label>
                            <Input
                                id="client"
                                value={data.client}
                                onChange={(e) =>
                                    setData('client', e.target.value)
                                }
                            />
                            <InputError message={errors.client} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                value={data.year}
                                onChange={(e) =>
                                    setData('year', e.target.value)
                                }
                            />
                            <InputError message={errors.year} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                            />
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tools">Tools</Label>
                        <Input
                            id="tools"
                            value={data.tools}
                            onChange={(e) => setData('tools', e.target.value)}
                            placeholder="Figma, React, Laravel"
                        />
                        <p className="text-xs text-muted-foreground">
                            Separate each tool with a comma.
                        </p>
                        <InputError message={errors.tools} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                            id="summary"
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            rows={3}
                            required
                        />
                        <InputError message={errors.summary} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="challenge">Challenge</Label>
                        <Textarea
                            id="challenge"
                            value={data.challenge}
                            onChange={(e) =>
                                setData('challenge', e.target.value)
                            }
                            rows={4}
                        />
                        <InputError message={errors.challenge} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="process">Process</Label>
                        <Textarea
                            id="process"
                            value={data.process}
                            onChange={(e) => setData('process', e.target.value)}
                            rows={4}
                        />
                        <InputError message={errors.process} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="solution">Solution</Label>
                        <Textarea
                            id="solution"
                            value={data.solution}
                            onChange={(e) =>
                                setData('solution', e.target.value)
                            }
                            rows={4}
                        />
                        <InputError message={errors.solution} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Results</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addResult}
                            >
                                <Plus />
                                Add result
                            </Button>
                        </div>

                        {data.results.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No results added.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {data.results.map((result, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="grid flex-1 gap-2">
                                            <Input
                                                value={result.label}
                                                onChange={(e) =>
                                                    updateResult(
                                                        index,
                                                        'label',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Label"
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `results.${index}.label`
                                                    ]
                                                }
                                            />
                                        </div>
                                        <div className="grid flex-1 gap-2">
                                            <Input
                                                value={result.value}
                                                onChange={(e) =>
                                                    updateResult(
                                                        index,
                                                        'value',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Value"
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `results.${index}.value`
                                                    ]
                                                }
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeResult(index)}
                                            aria-label="Remove result"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <Input
                                id="thumbnail"
                                value={data.thumbnail}
                                onChange={(e) =>
                                    setData('thumbnail', e.target.value)
                                }
                            />
                            <InputError message={errors.thumbnail} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hero_media">Hero media</Label>
                            <Input
                                id="hero_media"
                                value={data.hero_media}
                                onChange={(e) =>
                                    setData('hero_media', e.target.value)
                                }
                            />
                            <InputError message={errors.hero_media} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="demo_url">Demo URL</Label>
                            <Input
                                id="demo_url"
                                value={data.demo_url}
                                onChange={(e) =>
                                    setData('demo_url', e.target.value)
                                }
                            />
                            <InputError message={errors.demo_url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="badge">Badge</Label>
                            <Input
                                id="badge"
                                value={data.badge}
                                onChange={(e) =>
                                    setData('badge', e.target.value)
                                }
                            />
                            <InputError message={errors.badge} />
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

                        <div className="flex items-center gap-2 pt-6">
                            <Checkbox
                                id="featured"
                                checked={data.featured}
                                onCheckedChange={(checked) =>
                                    setData('featured', checked === true)
                                }
                            />
                            <Label htmlFor="featured">Featured</Label>
                            <InputError message={errors.featured} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            Save
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={projects.index()} prefetch>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

ProjectForm.layout = {
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
