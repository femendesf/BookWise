import Image from "next/image";

interface PhotoProfileProps {
    imageUrl: string;
    size?: string; // Tamanho opcional
}

export function PhotoProfile({ imageUrl, size}: PhotoProfileProps) {
   
    const sizePhotoProfile = size ? parseFloat(size) * 16 : undefined

    return (
        <div
            className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] p-[2px]"
            style={{ width: size, height: size }} // Aplica o tamanho diretamente
        >
            <div className="flex items-center justify-center w-full h-full bg-black rounded-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt="Foto de perfil"
                    width={sizePhotoProfile}
                    height={sizePhotoProfile}
                    className="rounded-full object-cover"
                />
            </div>
        </div>
    );
}
