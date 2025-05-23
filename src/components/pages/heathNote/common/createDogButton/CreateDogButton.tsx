import { useRouter } from "next/navigation";
import { createDogButton } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import AddIcon from "/public/images/icons/add-circle.svg";

const CreateDogButton = () => {
	const router = useRouter();
	const handleNavigateToCreateDog = () => {
		router.push('/health-note/dogs/create');
	}
	return (
		<Button variant='outline' type='assistive' size="lg" fullWidth onClick={handleNavigateToCreateDog}>
			<DefaultText type='headline3' className={createDogButton}>
				<SvgIcon src={AddIcon} />새로운 아이 등록하기
			</DefaultText>
		</Button>
	);
};

export default CreateDogButton;