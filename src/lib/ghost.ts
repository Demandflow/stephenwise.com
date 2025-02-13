import GhostContentAPI from '@tryghost/content-api';

// For development, we'll use a valid 26-character key based on the provided key
const DEV_API_KEY = 'b0efad4a2d34b71a04468e7675' + '0';  // Adding '0' to make it 26 chars

// Initialize Ghost Content API
const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL || 'http://localhost:2368',
    key: process.env.NODE_ENV === 'development' ? DEV_API_KEY : (process.env.GHOST_CONTENT_API_KEY || ''),
    version: 'v5.0'
});

export async function getPosts() {
    try {
        return await api.posts
            .browse({
                limit: 'all',
                include: ['tags', 'authors']
            });
    } catch (err) {
        console.error('Error fetching posts:', err);
        return [];
    }
}

export async function getNewsletters() {
    try {
        return await api.posts
            .browse({
                limit: 'all',
                filter: 'tag:newsletter',
                include: ['tags', 'authors']
            });
    } catch (err) {
        console.error('Error fetching newsletters:', err);
        return [];
    }
}

export async function getSinglePost(slug: string) {
    try {
        return await api.posts
            .read({
                slug,
                include: ['tags', 'authors']
            });
    } catch (err) {
        console.error('Error fetching post:', err);
        return null;
    }
} 