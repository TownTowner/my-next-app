export default function Page({ params }: { params: { slug: string } }) {
    return <div>Hello, blog [{params.slug}] page</div>;
}