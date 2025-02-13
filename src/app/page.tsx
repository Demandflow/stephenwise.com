import { getPosts } from '@/lib/ghost';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    const posts = await getPosts();

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Stephen Wise</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
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
        </main>
    );
} 