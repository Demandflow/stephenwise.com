declare module '@tryghost/content-api' {
    export interface PostsOrPages {
        id: string;
        uuid: string;
        title: string;
        slug: string;
        html: string;
        comment_id: string;
        feature_image: string | null;
        featured: boolean;
        visibility: string;
        created_at: string;
        updated_at: string;
        published_at: string;
        custom_excerpt: string | null;
        codeinjection_head: string | null;
        codeinjection_foot: string | null;
        custom_template: string | null;
        canonical_url: string | null;
        tags: Tag[];
        authors: Author[];
        primary_author: Author;
        primary_tag: Tag;
        url: string;
        excerpt: string;
        reading_time: number;
        access: boolean;
        comments: boolean;
        og_image: string | null;
        og_title: string | null;
        og_description: string | null;
        twitter_image: string | null;
        twitter_title: string | null;
        twitter_description: string | null;
        meta_title: string | null;
        meta_description: string | null;
    }

    export interface Tag {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        feature_image: string | null;
        visibility: string;
        url: string;
    }

    export interface Author {
        id: string;
        name: string;
        slug: string;
        profile_image: string | null;
        cover_image: string | null;
        bio: string | null;
        website: string | null;
        location: string | null;
        facebook: string | null;
        twitter: string | null;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    }

    export interface BrowseParams {
        include?: string;
        limit?: string | 'all';
        filter?: string;
    }

    export interface ReadParams {
        include?: string;
        slug: string;
    }

    export interface GhostAPI {
        posts: {
            browse: (params?: BrowseParams) => Promise<PostsOrPages[]>;
            read: (params: ReadParams) => Promise<PostsOrPages>;
        };
    }

    export interface GhostContentAPIOptions {
        url: string;
        key: string;
        version: string;
    }

    export default class GhostContentAPI {
        constructor(options: GhostContentAPIOptions);
        posts: {
            browse: (params?: BrowseParams) => Promise<PostsOrPages[]>;
            read: (params: ReadParams) => Promise<PostsOrPages>;
        };
    }
} 