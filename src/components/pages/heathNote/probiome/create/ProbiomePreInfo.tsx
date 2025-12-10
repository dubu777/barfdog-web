import { useGetProbiomePreInfo } from "@/api/healthNote/probiome/queries/useGetProbiomePreInfo";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import Spinner from "@/components/ui/spinner/Spinner";
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
      <Text type="title3">
        아래의 정보로
        <br />
        사전 문진을 작성할게요
      </Text>
      <div className={commonWrapper({ gap: 16, direction: "col" })}>
        <Card shadow="light" gap={12} padding={16} align="start">
          <Text type="title4">신청인 정보</Text>
          <Divider height={2} color="gray900" />
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
          <Text type="title4">반려견 정보</Text>
          <Divider height={2} color="gray900" />
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
