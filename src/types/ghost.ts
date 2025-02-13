export interface Author {
    id: string;
    name: string;
    slug: string;
    profile_image: string;
    bio: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface Post {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    feature_image: string;
    featured: boolean;
    published_at: string;
    updated_at: string;
    excerpt: string;
    authors: Author[];
    tags: Tag[];
} 