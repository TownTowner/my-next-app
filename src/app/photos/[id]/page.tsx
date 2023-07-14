import photos from "@/photo"
import { Frame } from "@/components/frame/Frame"

export default function PhotoPage({ params }: { params: any }) {
    const photo = photos.find(x => x.id === params.id);

    return (
        <div className={"container mx-auto my-10"}>
            <div className={"w-1/2 mx-auto border border-amber-600"}>
                <Frame photo={photo} />
            </div>
        </div>
    )
}