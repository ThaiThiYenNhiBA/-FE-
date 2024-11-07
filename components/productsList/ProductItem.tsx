import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import NoImage from '../NoImage'; // Sử dụng component NoImage để thay thế khi không có ảnh
import { productImgRatio } from '../../lib/imgs'; // Giả sử đã có công cụ này
import { TThumbRatio } from 'boundless-api-client'; // Thêm tỷ lệ ảnh nếu cần

import PostActions from '../PostActions'; // Import PostActions


export default function ComicItem({ query }: IComicItemProps) {
	const [comicsData, setComicsData] = useState<any[]>([]); // Lưu nhiều cuốn truyện vào mảng

	// Gọi API khi component được mount
	useEffect(() => {
		axios.get('http://localhost:8082/api/comics?id=1')
			.then(response => {
				const newComicsData = response.data.data;

				setComicsData(prevData => {
					// Lọc ra các comic chưa có trong prevData để tránh trùng lặp
					const uniqueCatalogs = new Set(prevData.map(comic => comic.catalog));
					const uniqueComics = newComicsData.filter(comic => !uniqueCatalogs.has(comic.catalog));
					return [...prevData, ...uniqueComics]; // Thêm các comic mới vào mảng hiện tại
				});
			})
			.catch(error => {
				console.error("Error fetching comics data:", error);
			});
	}, []); // Chạy một lần khi component mount

	if (!comicsData.length) {
		return <div>Loading...</div>; // Trường hợp chưa có dữ liệu
	}

	return (
		<ul className="products">
			{comicsData.map((comic, index) => (
				<li
					key={index} // Đảm bảo có key duy nhất cho mỗi phần tử trong list
					className={clsx('products__item')}
					data-id={comic.catalog}
					itemScope
					itemType='//schema.org/Comic'
				>
					<div className='products__item-wrapper'>
						<ComicImage comicImage={comic.introimage} comicUrl={`/comics/${comic.catalog}`} />
						<h4 className='products__title'>
							<Link href={`/comics/${comic.catalog}`} itemProp='url'>
								<span itemProp='name'>Tên truyện: {comic.comicname}</span>
							</Link>
						</h4>
						<div className='products__type'>
							<span>Thể loại: {comic.type}</span> {/* Hiển thị thể loại */}
						</div>
					</div>
					<PostActions /> {/* Bạn có thể thêm PostActions nếu cần */}
				</li>
			))}
		</ul>
	);
}

function ComicImage({ comicImage, comicUrl }: { comicImage: string; comicUrl: string }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={comicUrl} style={{ position: 'relative', display: 'inline-block' }}>
			<div
				style={{ position: 'relative' }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{comicImage ? (
					<img
						src={comicImage}
						alt="Comic image"
						style={{
							width: '100%',
							height: 'auto',
							objectFit: 'contain',
							aspectRatio: '80 / 123',
							filter: isHovered ? 'blur(4px)' : 'none',
							transition: 'filter 0.3s ease',
						}}
					/>
				) : (
					<NoImage ratio={productImgRatio || TThumbRatio['1-1']} />
				)}
				{isHovered && (
					<div
						style={{
							position: 'absolute',
							bottom: '20px',
							left: '50%',
							transform: 'translateX(-50%)',
							backgroundColor: 'rgba(0, 0, 0, 0)',
							color: '#d63384',
							padding: '5px 10px',
							borderRadius: '5px',
							whiteSpace: 'nowrap',
							opacity: isHovered ? 1 : 0,
							transition: 'opacity 0.3s ease',
						}}
					>
						{/* Nội dung pop-up */}
						Đây là mô tả truyện
					</div>
				)}
			</div>
		</Link>
	);
}

interface IComicItemProps {
	query: any;
}
