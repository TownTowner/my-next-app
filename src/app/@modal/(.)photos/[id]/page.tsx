import { Frame } from "@/components/frame/Frame";
import Modal from "@/components/modal";
import photos from "@/photo";

export default function PhotoModal({ params: { id: photoId } }) {
    const photo = photoId && photos.find(x => x.id === photoId);

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    )
}