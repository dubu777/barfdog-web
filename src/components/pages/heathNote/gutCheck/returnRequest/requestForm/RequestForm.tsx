import * as styles from './RequestForm.css';
import { useEffect, useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import Card from "@/components/common/card/Card";
import InfoText from "@/components/common/infoText/InfoText";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import AddressContent from "@/components/common/addressContent/AddressContent";
import CreateButton from "@/components/common/createButton/CreateButton";
import DeliveryModal from "@/components/common/modal/deliveryModal/DeliveryModal";
import useModal from "@/hooks/useModal";
import { ClientDeliveryDto, ImageFile } from "@/types";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";

const REQUEST_FORM_NOTICE_LIST = [
	{
		value: (
			<DefaultText type='body3' color='gray700'>회수 신청 후 문 앞에 채취한 변이 담긴 키트를 포장하여 놓아주시면 수거 후 분석기관에 전달됩니다.</DefaultText>
		),
		isPointColor: false,
	},
	{
		value: (
			<DefaultText type='body3' color='gray700'>요청하신 회수 택배비는 바프독에서 부담합니다.</DefaultText>
		),
		isPointColor: false,
	},
	{
		value: (
			<div>
				<DefaultText type='body3' color='gray700'>한 주의 회수 신청 마감은 </DefaultText>
				<DefaultText type='headline4' color='red'>매주 목요일 16시</DefaultText>
				<DefaultText type='body3' color='gray700'>입니다. 이후 신청하는 회수 신청 건은 차주 월요일 회수 진행될 예정입니다.</DefaultText>
			</div>
		),
		isPointColor: false,
	},
	{
		value: (
			<DefaultText type='body3' color='gray700'>
				ex)<br/>
				화요일 15시 신청 → 수요일 회수<br/>
				화요일 17시 신청 → 수요일 접수 → 목요일 회수<br/>
				목요일 17시 신청 → 금요일 접수 → 월요일 회수
			</DefaultText>
		),
		isPointColor: false,
	},
	{
		value: (
			<>
				<DefaultText type='headline4' color='red'>분석 결과는 키트 회수 시점 기준 평균 4~6주 후에 </DefaultText>
				<DefaultText type='body3' color='gray700'>받아보실 수 있습니다. 보다 정확한 분석 결과를 제공드리기 위해 다소 오랜 시간이 소요되는 점 양해 말씀드립니다.</DefaultText>
			</>
		),
		isPointColor: true,
	},
]

interface RequestFormProps {
	confirm: boolean;
	setConfirm: (confirm: boolean) => void;
}

const RequestForm = ({
	confirm,
	setConfirm,
}: RequestFormProps) => {
	const [addImageIdList, setAddImageIdList] = useState<number[]>([]);

	const { data: addressData } = useGetAddressList();
	const rawDefaultAddress = addressData.find(address => address.default === true);

	const defaultAddress = rawDefaultAddress
		? (({ id, ...rest }) => ({ ...rest, deliveryId: id }))(rawDefaultAddress)
		: null;

	const { deliveryDto, setDeliveryDto, setBackupDeliveryDto } =
		useDeliveryStore();
	const hasDefaultAddress = deliveryDto.deliveryId !== 0;

	const { isOpen: isOpenDeliveryModal, onToggle: onToggleDeliveryModal, onClose: onCloseDeliveryModal } = useModal();

	console.log('addressData', addressData);
	console.log('deliveryDto', deliveryDto);
	console.log('defaultAddress', defaultAddress);
	
	useEffect(() => {
		if (defaultAddress) {
			setDeliveryDto(defaultAddress);
		}
	}, [])

	const handleFileUpload = async (files: ImageFile[]) => {
		const uploadedImageList: number[] = [];
		for (const file of files) {
			if (file.id) {
				uploadedImageList.push(file.id);
			}
		}
		setAddImageIdList((prev) => Array.from(new Set([...prev, ...uploadedImageList])));
	}
	const handleFileRemove = (id: number) => {
		setAddImageIdList(prev => prev.filter(imageId => imageId !== id));
	}

	return (
		<>
			<div>
				<div className={styles.requestFormBox({ gap: 16 })}>
					<AddressContent
						isDefault={deliveryDto.default}
						showHeader
						addressData={hasDefaultAddress ? deliveryDto as ClientDeliveryDto : null}
						handleEditAddress={hasDefaultAddress ? onToggleDeliveryModal : undefined}
					/>
					{!hasDefaultAddress &&
						<CreateButton onClick={onToggleDeliveryModal} text='배송지 추가하기' />
					}
				</div>
				<Divider thickness={8} color='gray50' />
				<div className={styles.requestFormBox({ gap: 8 })}>
					<DefaultText type='title4'>반려견 대변 사진</DefaultText>
					<DefaultText type='label4' color='gray700'>사진을 업로드하면 분석 정확도가 올라가요</DefaultText>
					<MultiFileUpload
						uploadApiUrl='/api/reviews/upload'
						onFilesChange={(files) => handleFileUpload(files as ImageFile[])}
						maxFiles={10}
						imageWidth={100}
						imageHeight={100}
						initialImages={[]}
						handleRemove={(id) => handleFileRemove(id)}
					/>
				</div>
				<Divider thickness={8} color='gray50' />
				<div className={styles.requestFormBox({ gap: 20 })}>
					<DefaultText type='title4'>아래의 사항을 꼭 확인해 주세요</DefaultText>
					<Card
						shadow='none'
						backgroundColor='gray50'
						padding={16}
						gap={8}
						align='start'
						className={styles.requestFormNotice}
					>
						{REQUEST_FORM_NOTICE_LIST.map((notice, index) => (
							<div key={index}>
								<InfoText color={notice.isPointColor ? 'red' : 'gray700'} type='body3'>
									{notice.value}
								</InfoText>
							</div>
						))}
					</Card>
					<LabeledRadioButton
						value={confirm}
						isChecked={confirm}
						onToggle={() => setConfirm(!confirm)}
					>
						<DefaultText type='label2' color='gray800'>회수 안내사항을 확인했습니다</DefaultText>
					</LabeledRadioButton>
				</div>
			</div>
			{isOpenDeliveryModal &&
				<DeliveryModal
					addressData={addressData}
					isVisible={isOpenDeliveryModal}
					onClose={onCloseDeliveryModal}
					setDeliveryDto={setDeliveryDto}
					setBackupDeliveryDto={setBackupDeliveryDto}
				/>
			}
		</>
	);
};

export default RequestForm;