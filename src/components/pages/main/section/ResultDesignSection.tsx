import DefaultText from "@/components/common/defaultText/DefaultText";
import { mainContainer } from "@/components/pages/main/common/MainCommon.css";

const ResultDesignSection = () => {
	return (
		<article className={mainContainer}>
			<DefaultText type='title2' preLine align='center'>혼자서 고민하지 마세요<br/>바프독이 덜어드릴게요</DefaultText>
		</article>
	);
};

export default ResultDesignSection;