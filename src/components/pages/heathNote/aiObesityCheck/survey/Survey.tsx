'use client';
import { commonWrapper } from '@/styles/common.css';
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import LoadingImage from '/public/images/healthNote/aiObesityCheck/scan.gif';
import BackIcon from "/public/images/header/chevron-left.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import Header from "@/components/layout/header/Header";
import Step1 from "@/components/pages/heathNote/aiObesityCheck/survey/steps/Step1";
import Step2 from "@/components/pages/heathNote/aiObesityCheck/survey/steps/Step2";
import Step3 from "@/components/pages/heathNote/aiObesityCheck/survey/steps/Step3";
import Step4 from "@/components/pages/heathNote/aiObesityCheck/survey/steps/Step4";
import useDeviceState from '@/hooks/useDeviceState';
import { useToastStore } from '@/store/useToastStore';
import { useImageUpload } from "@/hooks/useImageUpload";
import { queryKeys } from "@/constants";
import { getNameWithPossessiveSuffix } from "@/utils";
import { getUploadErrorMessage } from '@/utils/healthNote/aiObesityCheck/getUploadErrorMessage';
import { getObesityDetail } from "@/api/healthNote/aiObesityCheck/aiObesityCheck";
import { useUploadObesityImage } from "@/api/healthNote/aiObesityCheck/mutation/useUploadObesityImage";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Survey({ petId }: { petId: number }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { isMobileWidth } = useDeviceState();
	const { addToast} = useToastStore();

	const { data: petInfo } = useGetPetDetail(petId);

	const [weight, setWeight] = useState<string | null>( null);
	const [steps, setSteps] = useState<1 | 2 | 3 | 4 | 5>(1);
	const [loading, setLoading] = useState(false);

	const isFirstStep = steps === 1;
	const isLastStep = steps === 4;

	const onPrevStep = () => {
		if (isFirstStep) {
			router.back();
			return;
		}
		if (isLastStep) {
			resetFiles();
			setSteps(3);
			return;
		}
		setSteps((prev) => prev - 1 as 1 | 2 | 3 | 4 | 5);
	};

  const inputRef = useRef<HTMLInputElement>(null);

	const {
		files,
		previews,
		handleChange: originalHandleChange,
		resetFiles,
	} = useImageUpload({ multiple: false });
	const { mutateAsync } = useUploadObesityImage();

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			await originalHandleChange(e);
		} catch (error) {
			if (error instanceof Error) {
				addToast(error.message, steps === 4 ? 'above-button' : 'bottom');
			}
		}
	};

	const handleSubmit = async () => {
		if (files.length < 1 || !weight) return;
		
		setLoading(true);
		try {
			await sleep(1000);
			const res = await mutateAsync({ file: files[0], weight: Number(weight) });
			const surveyId = res?.surveyId;

			if (!surveyId) {
				console.warn("surveyId 없음");
				addToast('surveyId가 없습니다.', 'above-button');
				return;
			}

			await queryClient.prefetchQuery({
				queryKey: [
					queryKeys.AI_OBESITY_CHECK.BASE, 
					queryKeys.AI_OBESITY_CHECK.GET_OBESITY_DETAIL, 
					surveyId
				],
				queryFn: () => getObesityDetail(surveyId),
			});

			router.push(`/health-note/${petId}/ai-obesity-check/result/${surveyId}`);
		} catch (error) {
			const errorMessage = getUploadErrorMessage(error);
			addToast(errorMessage, 'above-button');
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Header
				backgroundColor='gray50'
				leftElement={
					!isFirstStep && 
						<button onClick={onPrevStep} disabled={loading} className={commonWrapper({ gap: 6 })}>
							<SvgIcon
								src={BackIcon}
								size={24}
								color="gray900"
							/>
							<Text type="headline3" color="gray500">
								이전
							</Text>
						</button>
				}
				onClose={() => router.back()}
				showCloseButton={!loading}
			/>
			<section className={commonWrapper({
				minHeight: 'fullWithHeader',
				direction: 'col',
				justify: 'start',
				gap: 20,
				backgroundColors: 'gray50',
			})}>
				{loading ? (
					<>
						<Text type='title2' align='center' className={commonWrapper({ padding: 20, paddingTop: 40 })}>
							{getNameWithPossessiveSuffix(petInfo?.name)}의 결과를<br />분석하고 있어요
						</Text>
						<Image src={LoadingImage} alt='loadingImage' width={265} height={425} />
					</>
				) : (
					<>
						{steps === 1 && (
							<Step1
								petName={petInfo?.name}
								weight={weight!} 
								setWeight={setWeight} 
								setSteps={setSteps} 
							/>
						)}
						{steps === 2 && (
							<Step2
								isMobileWidth={isMobileWidth}
								setSteps={setSteps} 
							/>
						)}
						{steps === 3 &&
							<Step3
								petName={petInfo?.name}
								files={files}
								handleChange={handleChange}
								steps={steps}
								setSteps={setSteps}
							/>
						}
						{steps === 4 &&
							<Step4
								previews={previews}
								handleSubmit={handleSubmit}
								loading={loading}
								inputRef={inputRef}
								handleChange={handleChange}
								setSteps={setSteps}
							/>
						}
					</>
				)}
			</section>
		</>
	);
}