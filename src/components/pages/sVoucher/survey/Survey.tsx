'use client';
import * as styles from './Survey.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingImage from '/public/images/sVoucher/scan.gif';
import Step1 from "@/components/pages/sVoucher/survey/steps/Step1";
import Step2 from "@/components/pages/sVoucher/survey/steps/Step2";
import Step3 from "@/components/pages/sVoucher/survey/steps/Step3";
import Step4 from "@/components/pages/sVoucher/survey/steps/Step4";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUploadObesityImage } from "@/api/sVoucher/mutation/useUploadObesityImage";
import { getObesityDetail } from "@/api/sVoucher/sVoucher";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Survey() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [weight, setWeight] = useState<number | null>( null);
	const [steps, setSteps] = useState<1 | 2 | 3 | 4 | 5>(1);
	const [loading, setLoading] = useState(false);

	const {
		files,
		previews,
		handleChange,
		resetFiles,
	} = useImageUpload({ multiple: false });
	const { mutateAsync } = useUploadObesityImage();

	const handleSubmit = async () => {
		if (files.length < 1 || !weight) return;
		setLoading(true);
		try {
			await sleep(1000);
			const res = await mutateAsync({ file: files[0], weight });
			const surveyId = res?.surveyId;

			if (surveyId) {
				await queryClient.prefetchQuery({
					queryKey: [queryKeys.S_VOUCHER.BASE, queryKeys.S_VOUCHER.GET_OBESITY_DETAIL, surveyId],
					queryFn: () => getObesityDetail(surveyId),
				});

				router.push(`/result/${surveyId}`);
			} else {
				console.warn("응답에 surveyId 없음");
				alert('응답에 surveyId가 없습니다.')
				setLoading(false);
			}
		} catch (err) {
			console.error("업로드 실패:", err);
			alert('업로드에 실패했습니다.')
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section className={styles.surveyContainer}>
				<DefaultText type='title2' className={styles.surveyTitle}>
					우리 아이의 결과를<br />분석하고 있어요
				</DefaultText>
				<Image src={LoadingImage} alt='loadingImage' width={265} height={425} />
			</section>
		);
	}

	return (
		<section className={styles.surveyContainer}>
			{ steps === 1 && <Step1 weight={weight!} setWeight={setWeight} setSteps={setSteps} /> }
			{ steps === 2 && <Step2 setSteps={setSteps} /> }
			{ steps === 3 &&
				<Step3
					files={files}
					handleChange={handleChange}
					steps={steps}
					setSteps={setSteps}
				/>
			}
			{steps === 4 &&
				<Step4
					previews={previews}
					setSteps={setSteps}
					resetFiles={resetFiles}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			}
		</section>
	);
}