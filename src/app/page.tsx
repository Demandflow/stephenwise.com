import { getPosts } from '@/lib/ghost';
import { PostsOrPages } from '@tryghost/content-api';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    try {
        const posts = await getPosts();

        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Stephen Wise</h1>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Welcome to my blog!</h2>
                        <p className="text-gray-500 mb-4">Content is coming soon. Stay tuned!</p>
                        <div className="text-sm text-gray-400">
                            {process.env.NODE_ENV === 'development' && (
                                <p>
                                    To add content, visit your Ghost admin panel at{' '}
                                    <a href="http://localhost:2368/ghost/" className="text-blue-500 hover:text-blue-600 underline">
                                        http://localhost:2368/ghost/
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: PostsOrPages) => (
                            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {post.feature_image && (
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={post.feature_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                                        <Link href={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <div className="text-gray-600 text-sm mb-4">
                                        {new Date(post.published_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        {post.reading_time && ` · ${post.reading_time} min read`}
                                    </div>
                                    <p className="text-gray-700 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/post/${post.slug}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                                    >
                                        Read more
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        );
    } catch (error) {
        console.error('Error in Home component:', error);
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Stephen Wise</h1>
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Unable to connect to blog</h2>
                    <p className="text-gray-600 mb-4">There was an error connecting to the content management system.</p>
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-2xl mx-auto">
                            <p className="text-left text-sm text-gray-600 mb-2">Debug Information:</p>
                            <pre className="text-left text-xs bg-white p-3 rounded border border-gray-200 overflow-auto">
                                {error instanceof Error ? error.message : 'Unknown error occurred'}
                            </pre>
                            <p className="text-left text-sm text-gray-600 mt-4">
                                Make sure:
                                <ul className="list-disc list-inside mt-2">
                                    <li>Your Ghost instance is running at {process.env.GHOST_API_URL || 'http://localhost:2368'}</li>
                                    <li>Your Content API key is correctly set in the environment variables</li>
                                    <li>You can access the Ghost Admin panel</li>
                                </ul>
                            </p>
                        </div>
                    )}
                </div>
            </main>
        );
    }
} 