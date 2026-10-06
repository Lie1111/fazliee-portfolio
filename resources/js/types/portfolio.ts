export type Profile = {
    id: number;
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

export type ProjectResult = {
    label: string;
    value: string;
};

export type Project = {
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

export type Service = {
    id: number;
    number: string;
    title: string;
    description: string;
    icon: string | null;
    items: string[] | null;
    sort_order: number;
};

export type Skill = {
    id: number;
    name: string;
    category: string;
    sort_order: number;
};

export type TimelineItem = {
    id: number;
    type: string;
    title: string;
    organisation: string | null;
    period: string | null;
    description: string | null;
    sort_order: number;
};

export type FlashProps = {
    toast?: {
        type: 'success' | 'error' | 'info';
        message: string;
    };
};
