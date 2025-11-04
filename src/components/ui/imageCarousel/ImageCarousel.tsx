import { previewImage, previewSlide, previewSlider, removeButton, thumbnail } from "./ImageCarousel.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close-circle-fill.svg';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { ImageFile, UploadedFile } from "@/types";

// 건강수첩 부분으로부터 UploadedFile type 형식이 바뀜
// 현재 다른 곳 ImageFile type 으로 사용중임에 따라 임시로 처리
// 추후 UploadedFile로 변경 필요

interface ImageCarouselProps {
	imageList: ImageFile[] | UploadedFile[];
	width?: number;
	height?: number;
	handleRemoveFile?: (fileId: number) => void;
	handleThumbnailClick?: (index: number, id?: number) => void;
	showRepresentativeLabel?: boolean;
}

export default function ImageCarousel({
	imageList,
	width = 100,
	height = 100,
	handleRemoveFile,
	handleThumbnailClick,
	showRepresentativeLabel = false,
}: ImageCarouselProps) {
	
	return (
		<Swiper
			slidesPerView='auto'
			spaceBetween={4}
			className={previewSlider}
		>
			<ul>
				{imageList.map((preview, index) => {
					return (
						<SwiperSlide
								key={preview.fileId ? `image-${preview.fileId}` : `image-${preview.fileName}-${index}`}
								className={previewSlide({ showRepresentativeLabel })}
								style={{ width: width, height: height, cursor: handleRemoveFile ? 'grabbing' : 'default' }}
								onClick={handleThumbnailClick ? () => handleThumbnailClick(index, preview.fileId) : undefined}
						>
								{index === 0 && showRepresentativeLabel &&
									<Text type='caption' color='white' className={thumbnail}>대표</Text>
								}
								<li>
									<Image
										src={preview.displayImageUrl?.url ?? ""}
										alt={`${preview.fileName}-${index}`}
										width={width}
										height={height}
										className={previewImage({ cursor: handleThumbnailClick ? 'pointer' : 'default' })}
									/>
									{handleRemoveFile &&
										<button type='button' onClick={() => handleRemoveFile(preview.fileId)} className={removeButton}>
											<SvgIcon src={CloseButton} size={24} color='gray500' />
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