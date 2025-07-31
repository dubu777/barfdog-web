import * as styles from "@/components/pages/sVoucher/result/Result.css";
import { pointColor } from "@/styles/common.css";
import Image from "next/image";
import DownloadIcon from '/public/images/sVoucher/download.svg';
import WeightIcon from '/public/images/sVoucher/weight-sm.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Divider from "@/components/common/divider/Divider";
import Button from "@/components/common/button/Button";
import { ObesityDetailResponse } from "@/types/sVoucher";

interface ResultInfoProps {
	data: ObesityDetailResponse;
	surveyId: number;
}

export default function ResultInfo({
	data,
	surveyId,
}: ResultInfoProps) {

	const obesityLabelMatch = data.status?.match(/\(([^)]+)\)/);
	const obesityLabel = obesityLabelMatch ? obesityLabelMatch[1] : '';

	const imageList = [data?.fileUrl, data?.oriFileUrl].map((file, index) =>
		({
			url: file,
			filename: index === 0 ? 'fileUrl' : 'oriFileUrl'
		})
	);

	const downloadImage = (url: string) => {
		const link = document.createElement('a');
		link.href = url;
		link.download = `분석결과-${surveyId}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className={styles.resultInfo}>
			<DefaultText type='title3' align='center'>
				AI 비만도 분석 결과 리포트
			</DefaultText>
			<Card shadow='strong' direction='col' gap={12} borderRadius={16} className={styles.resultCard}>
				<DefaultText type='headline3' align='center' className={styles.resultTitle}>
					<SvgIcon src={WeightIcon} size={32} />
					<span>
							{data.score}점으로 <span className={pointColor}>{data?.status}</span> 결과를 받았어요
						</span>
				</DefaultText>
				<Card shadow='none' backgroundColor='gray100' borderRadius={12} padding={16}>
					<div className={styles.resultDetail}>
						<div className={styles.resultBcs}>
							<DefaultText type='headline2' color='red' align='center'>
								BCS {data.bcs}단계
							</DefaultText>
							<DefaultText type='title2' color='red' align='center'>
								{obesityLabel}
							</DefaultText>
						</div>
						<Divider direction='vertical' thickness={1} color='gray300' style={{ height: '100%' }} />
						<DefaultText type='body3' style={{ maxWidth: '55%' }}>
							{data.description}
						</DefaultText>
					</div>
				</Card>
				<Swiper
					slidesPerView='auto'
					pagination
					modules={[Pagination]}
				>
					{imageList?.map(image => (
						<SwiperSlide key={image.filename} className={styles.resultImageSlider}>
							<Image src={image.url} alt={image.filename} width={500} height={500} className={styles.resultImage} />
						</SwiperSlide>
					))}
				</Swiper>
				<Button
					variant='solid'
					iconSrc={DownloadIcon}
					onClick={() => downloadImage(data.fileUrl)}
				>
					이미지 저장
				</Button>
			</Card>
		</div>
	);
}