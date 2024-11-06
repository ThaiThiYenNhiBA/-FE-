import { useState } from 'react';
import Image from 'next/legacy/image';
import { getProductsListImg, IImagePartial } from '../../lib/imgs';

export default function ProductListImage({
    image,
    alt,
    maxSize = 200
}: {
    image: IImagePartial;
    alt?: string;
    maxSize?: number;
}) {
    const { src, blurSrc, width, height } = getProductsListImg(image, maxSize);

    // State để quản lý hiển thị pop-up
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div
            className={'img text-center'}
            onMouseEnter={() => setShowPopup(true)} // Hiện pop-up khi di chuột vào
            onMouseLeave={() => setShowPopup(false)} // Ẩn pop-up khi rời chuột
            style={{ position: 'relative' }} // Đặt vị trí tương đối cho cha để pop-up định vị chính xác
        >
            {width && height ? (
                <Image
                    src={src}
                    width={width}
                    height={height}
                    placeholder='blur'
                    blurDataURL={blurSrc}
                    quality={100}
                    itemProp='image'
                    alt={alt}
                    className="next-image" // Thêm class cho hình ảnh Next.js
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    itemProp='image'
                />
            )}
            {/* Pop-up tên tác giả */}
            {showPopup && (
                <div className="author-popup">
                    Thái Thị Yến Nhi
                </div>
            )}
        </div>
    );
}
