'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function PostLink({ posts }: { posts: any[] }) {
    const pathname = usePathname();

    return (
        <ul>
            {
                posts.map((post, index) => {
                    const isActive = pathname.startsWith(post.slug);

                    return (
                        <li key={post.id}>
                            <Link className={isActive ? 'text-blue' : 'text-black'}
                                href={`/blog/${post.slug}`}>{post.title}</Link>
                            <br />
                        </li>)
                })
            }
        </ul>
    );
}