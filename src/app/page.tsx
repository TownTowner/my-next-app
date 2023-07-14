'use client';

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import PostLink from './blog/PostList';
import { useRouter } from 'next/navigation';
import photos from '../photo';

const postData = [
  { id: 1, slug: "aaa", title: "aaa" },
  { id: 2, slug: "bbb", title: "bbb" },
  { id: 3, slug: "ccc", title: "ccc" }
];

export default function Home() {
  // const router = useRouter();

  return (
    <main className={styles.main}>
      {/* <Link href={'/dash'} >Go Dash</Link>

      <button type="button" onClick={() => router.push('/dash')}>Dash btn</button>

      <PostLink posts={postData}></PostLink> */}

      <div className="grid">
        {photos.map((p) => (
          <Link key={p.id} href={`/photos/${p.id}`}>
            <Image alt=''
              src={p.imageSrc} height={100} width={100}
              className="object-cover" />
          </Link>
        ))}
      </div>

    </main >
  )
}
