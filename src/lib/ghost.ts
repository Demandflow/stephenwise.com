import GhostContentAPI, { PostsOrPages } from '@tryghost/content-api';
import axios from 'axios';

interface GhostError extends Error {
    message: string;
    code?: string;
    type?: string;
}

// For development, we'll use a valid 26-character key based on the provided key
const DEV_API_KEY = 'b0efad4a2d34b71a04468e7675' + '0';  // Adding '0' to make it 26 chars

// Create an axios instance with the correct configuration
const axiosInstance = axios.create({
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Initialize Ghost Content API with custom adapter
const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL || 'http://localhost:2368',
    key: process.env.NODE_ENV === 'development' ? DEV_API_KEY : (process.env.GHOST_CONTENT_API_KEY || ''),
    version: 'v5.0',
    // @ts-ignore - The type definition doesn't include the adapter option, but it's supported
    adapter: 'axios',
    axiosInstance
});

function logEnvironmentInfo() {
    console.log('Environment Information:', {
        NODE_ENV: process.env.NODE_ENV,
        GHOST_API_URL: process.env.GHOST_API_URL || 'http://localhost:2368',
        GHOST_CONTENT_API_KEY_LENGTH: process.env.GHOST_CONTENT_API_KEY?.length || 0,
        IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
        IS_PRODUCTION: process.env.NODE_ENV === 'production'
    });
}

export async function getPosts(): Promise<PostsOrPages[]> {
    try {
        logEnvironmentInfo();

        console.log('Initializing Ghost API request...');

        const apiConfig = {
            url: process.env.GHOST_API_URL || 'http://localhost:2368',
            key: process.env.NODE_ENV === 'development' ? DEV_API_KEY : process.env.GHOST_CONTENT_API_KEY,
            version: 'v5.0'
        };
        console.log('API Configuration:', {
            url: apiConfig.url,
            keyLength: apiConfig.key?.length || 0,
            version: apiConfig.version
        });

        console.log('Attempting to fetch posts...');
        const posts = await api.posts
            .browse({
                limit: 'all',
                include: ['tags', 'authors']
            });

        console.log(`Successfully fetched ${posts.length} posts`);
        if (posts.length > 0) {
            console.log('First post title:', posts[0].title);
        }
        return posts;
    } catch (error: unknown) {
        const err = error as GhostError;
        console.error('Detailed error information:', {
            message: err.message,
            code: err.code,
            type: err.type,
            stack: err.stack,
            fullError: JSON.stringify(err, null, 2)
        });

        // Construct a more detailed error message
        const errorDetails = [
            'Failed to fetch posts:',
            err.message,
            err.code ? `Code: ${err.code}` : null,
            err.type ? `Type: ${err.type}` : null
        ].filter(Boolean).join(' | ');

        throw new Error(errorDetails);
    }
}

export async function getNewsletters(): Promise<PostsOrPages[]> {
    try {
        console.log('Fetching newsletters...');
        return await api.posts
            .browse({
                limit: 'all',
                filter: 'tag:newsletter',
                include: ['tags', 'authors']
            });
    } catch (error: unknown) {
        const err = error as GhostError;
        console.error('Error fetching newsletters:', {
            message: err.message,
            code: err.code,
            type: err.type
        });
        return [];
    }
}

export async function getSinglePost(slug: string): Promise<PostsOrPages | null> {
    try {
        console.log(`Fetching post with slug: ${slug}`);
        return await api.posts
            .read({
                slug,
                include: ['tags', 'authors']
            });
    } catch (error: unknown) {
        const err = error as GhostError;
        console.error('Error fetching single post:', {
            message: err.message,
            code: err.code,
            type: err.type,
            slug
        });
        return null;
    }
} 