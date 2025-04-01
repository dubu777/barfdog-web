import { previewImage, previewSlide, previewSlider, removeButton } from "./ImageCarousel.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close-black.png';

interface InitialImages {
	id?: number;
	filename: string;
	url: string;
}

interface ImageCarouselProps {
	imageList: InitialImages[];
	width?: number;
	height?: number;
	handleRemoveFile?: (filename: string, id: number | undefined) => void;
	handleImageModalClick?: () => void;
}

export default function ImageCarousel({
	imageList,
	width = 100,
	height = 100,
	handleRemoveFile,
	handleImageModalClick,
}: ImageCarouselProps) {
	return (
		<Swiper
			slidesPerView='auto'
			spaceBetween={4}
			className={previewSlider}
			onClick={handleImageModalClick || undefined}
		>
			<ul>
				{imageList.map((preview, index) => {
					return (
						<SwiperSlide
								key={preview.id ? `image-${preview.id}` : `image-${preview.filename}-${index}`}
								className={previewSlide}
								style={{ width: width, height: height, cursor: handleRemoveFile ? 'grabbing' : 'default' }}
							>
								<li>
									<Image
										src={preview.url}
										alt={`${preview.filename}-${index}`}
										width={width}
										height={height}
										className={previewImage}
									/>
									{handleRemoveFile &&
										<button type='button' onClick={() => handleRemoveFile(preview.filename, preview.id)} className={removeButton}>
											<Image src={CloseButton} alt='close button' width={8} height={8} />
										</button>
									}
							</li>
						</SwiperSlide>
					)
				})}
			</ul>
		</Swiper>
	);
}