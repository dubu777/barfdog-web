import { useGetProbiomePreInfo } from "@/api/healthNote/probiome/queries/useGetProbiomePreInfo";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import LabelValueItem from "@/components/common/labelValueItem/LabelValueItem";
import Spinner from "@/components/common/spinner/Spinner";
import { commonWrapper } from "@/styles/common.css";
import { formatPhoneNumber } from "@/utils";

interface ProbiomePreInfoProps {
  petId: number;
  kitId: number;
  serialNo: string;
}

export default function ProbiomePreInfo({
  kitId,
  petId,
  serialNo,
}: ProbiomePreInfoProps) {
  const { data, isLoading } = useGetProbiomePreInfo(petId, serialNo);
  const { pet, member } = data || {};

  if (isLoading || !pet || !member) {
    return <Spinner />;
  }

  const petInfoItems = [
    { label: "반려견 이름", value: pet.name },
    { label: "견종", value: pet.breed },
    { label: "생년월일", value: pet.birthDay },
    { label: "성별", value: pet.gender === "FEMALE" ? "암컷" : "수컷" },
    // { label: "몸무게", value: `${pet.weight}kg` },
    {
      label: "중성화 여부",
      value: pet.neutralization ? "중성화 했어요" : "중성화 안했어요",
    },
  ];
  const memberInfoItems = [
    { label: "신청인", value: member.name },
    { label: "연락처", value: formatPhoneNumber(member.phoneNumber) },
  ];

  const handleGoToSurvey = () => {
    window.location.href = `/health-note/${petId}/probiome/survey?kitId=${kitId}&petName=${pet.name}&gender=${pet.gender}`;
  };

  return (
    <>
      <DefaultText type="title3">
        아래의 정보로
        <br />
        사전 문진을 작성할게요
      </DefaultText>
      <div className={commonWrapper({ gap: 16, direction: "col" })}>
        <Card shadow="light" gap={12} padding={16} align="start">
          <DefaultText type="title4">신청인 정보</DefaultText>
          <Divider thickness={2} color="gray900" />
          <div className={commonWrapper({ gap: 6, direction: "col" })}>
            {memberInfoItems.map((item, index) => (
              <LabelValueItem
                key={index}
                label={item.label}
                value={item.value}
                labelWidth={100}
              />
            ))}
          </div>
        </Card>
        <Card shadow="light" gap={12} padding={16} align="start">
          <DefaultText type="title4">반려견 정보</DefaultText>
          <Divider thickness={2} color="gray900" />
          <div className={commonWrapper({ gap: 6, direction: "col" })}>
            {petInfoItems.map((item, index) => (
              <LabelValueItem
                key={index}
                label={item.label}
                value={item.value}
                labelWidth={100}
              />
            ))}
          </div>
        </Card>
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="사전 문진 시작하기"
        onPrimaryClick={handleGoToSurvey}
      />
    </>
  );
}
