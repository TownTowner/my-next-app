export default function Page({ params }: { params: { slug: string } }) {
    // console.log('multi,', params);
    return <div>Hello, blog ...[{params.slug}] page</div>;
}