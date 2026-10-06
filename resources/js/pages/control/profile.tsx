import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { edit, update } from '@/routes/control/profile';

type Profile = {
    name: string;
    brand_name: string;
    headline: string;
    intro: string;
    about_story: string | null;
    email: string;
    phone: string | null;
    location: string | null;
    availability: string;
    linkedin: string | null;
    github: string | null;
    resume_url: string | null;
};

export default function Profile({ profile }: { profile: Profile | null }) {
    const { data, setData, put, processing, errors } = useForm({
        name: profile?.name ?? '',
        brand_name: profile?.brand_name ?? '',
        headline: profile?.headline ?? '',
        intro: profile?.intro ?? '',
        about_story: profile?.about_story ?? '',
        email: profile?.email ?? '',
        phone: profile?.phone ?? '',
        location: profile?.location ?? '',
        availability: profile?.availability ?? '',
        linkedin: profile?.linkedin ?? '',
        github: profile?.github ?? '',
        resume_url: profile?.resume_url ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        put(update.url(), { preserveScroll: true });
    };

    return (
        <>
            <Head title="Profile" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <Heading
                    title="Site profile"
                    description="The personal details shown across your public site"
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
                            <Label htmlFor="brand_name">Brand name</Label>
                            <Input
                                id="brand_name"
                                value={data.brand_name}
                                onChange={(e) =>
                                    setData('brand_name', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.brand_name} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                            id="headline"
                            value={data.headline}
                            onChange={(e) =>
                                setData('headline', e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.headline} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="intro">Intro</Label>
                        <Textarea
                            id="intro"
                            value={data.intro}
                            onChange={(e) => setData('intro', e.target.value)}
                            rows={3}
                            required
                        />
                        <InputError message={errors.intro} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="about_story">About story</Label>
                        <Textarea
                            id="about_story"
                            value={data.about_story}
                            onChange={(e) =>
                                setData('about_story', e.target.value)
                            }
                            rows={6}
                        />
                        <InputError message={errors.about_story} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                            />
                            <InputError message={errors.location} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="availability">Availability</Label>
                            <Input
                                id="availability"
                                value={data.availability}
                                onChange={(e) =>
                                    setData('availability', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.availability} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                type="url"
                                value={data.linkedin}
                                onChange={(e) =>
                                    setData('linkedin', e.target.value)
                                }
                                placeholder="https://linkedin.com/in/..."
                            />
                            <InputError message={errors.linkedin} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                                id="github"
                                type="url"
                                value={data.github}
                                onChange={(e) =>
                                    setData('github', e.target.value)
                                }
                                placeholder="https://github.com/..."
                            />
                            <InputError message={errors.github} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="resume_url">Resume URL</Label>
                        <Input
                            id="resume_url"
                            value={data.resume_url}
                            onChange={(e) =>
                                setData('resume_url', e.target.value)
                            }
                        />
                        <InputError message={errors.resume_url} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile',
            href: edit(),
        },
    ],
};
