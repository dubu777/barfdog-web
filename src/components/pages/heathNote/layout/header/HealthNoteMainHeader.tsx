import * as styles from './HealthNoteMainHeader.css';
import { useEffect } from "react";
import { createDogButton, dogImage } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import Link from "next/link";
import Image from "next/image";
import AccountCircle from '/public/images/icons/account_circle.svg';
import ChevronDown from '/public/images/icons/chevron-sort-up.svg';
import CheckCircle from '/public/images/mypage/check_circle.svg'
import PlusIcon from "/public/images/subscription/plus.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DogIcon from '/public/images/healthNote/dogIcon.png';
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";
import useModal from "@/hooks/useModal";
import { getCookie } from "@/utils/auth/cookie";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import { usePersistHealthNoteStore } from "@/store/usePersistHealthNoteStore";
import { DogInfo } from "@/types/healthNote";
import { AUTH_CONFIG } from "@/constants/auth";

const HealthNoteMainHeader = () => {
	const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
	const isLogin = isAuthenticated(token);

	const { data: dogList } = useGetDogList();
	const representativeDog = dogList?.find(dog => dog.representative);
	const { dogInfo, setDogInfo } = usePersistHealthNoteStore();

	const { isOpen, onClose, onToggle } = useModal();

	useEffect(() => {
		if (representativeDog) {
			setDogInfo({
				dogId: representativeDog.id,
				name: representativeDog.name,
				imageUrl: representativeDog.pictureUrl,
			})
		}
	}, []);

	const handleChangeDogInfo = (dogInfo: DogInfo) => {
		setDogInfo(dogInfo);
		onClose();
	}

	return (
		<>
			<header className={styles.heathNoteHeaderContainer}>
				{!isLogin && dogInfo
					? <SvgIcon src={AccountCircle} size={40} />
					: <Image src={dogInfo?.imageUrl || DogIcon} alt='대표 반려견' width={40} height={40} className={dogImage({ borderRadius: 'lg' })} />
				}
				<button onClick={onToggle} className={styles.selectButton}>
					<DefaultText type='headline1'>{!isLogin ? '반려견 등록' : dogInfo?.name}</DefaultText>
					<SvgIcon src={ChevronDown} style={{ transform: 'rotate(180deg)' }} />
				</button>
			</header>
			{isOpen &&
				<BottomSheet
					isOpen={isOpen}
					onClose={onClose}
				>
					<div className={styles.selectBottomSheetHeader}>
						<DefaultText type='title4'>반려견 선택</DefaultText>
						<Link href='/health-note/dogs'>
							<DefaultText type='label4' color='gray500'>전체보기</DefaultText>
						</Link>
					</div>
					<div className={styles.selectBottomSheetBox}>
						{dogList.map((dog, index) => {
							const active = dog.id === dogInfo?.dogId || false;
							return (
								<>
								<button
									key={dog.id}
									className={styles.selectDogButton}
									onClick={() => handleChangeDogInfo({ dogId: dog.id, name: dog.name, imageUrl: dog.pictureUrl })}
								>
									<div className={styles.selectBottomSheetDogInfo}>
										<Image src={dog.pictureUrl} alt={dog.name} width={40} height={40} className={dogImage({ borderRadius: 'lg', active })} />
										<DefaultText type='headline1'>{dog.name}</DefaultText>
									</div>
									{active &&
										<SvgIcon src={CheckCircle} size={24} color='red' />
									}
								</button>
								{dogList.length !== index + 1 &&
									<Divider thickness={1} color='gray100' />
								}
								</>
							)
						})}
					</div>
					<ButtonDocked
						type='full-button'
						primaryButtonVariant='outline'
						primaryButtonType='assistive'
						primaryButtonLabel={
							<DefaultText type='headline3' className={createDogButton}>
								<SvgIcon src={PlusIcon} />새로운 아이 등록하기
							</DefaultText>
						}
						onPrimaryClick={() => console.log('')}
						position='sticky'
					/>
				</BottomSheet>
			}
		</>
	);
};

export default HealthNoteMainHeader;