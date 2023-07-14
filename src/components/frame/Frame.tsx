import Image from "next/image";

export const Frame = ({ photo }) => {
    return (
        <>
            <Image src={photo.imageSrc}
                alt={""}
                width={600} height={600}
                className={"w-full object-cover aspect-square col-span-2"} />

            <div className="image-container p-4 px-6">
                <h3>{photo.name}</h3>
                <p>Shoot by {photo.username}</p>
            </div>
        </>
    )
}