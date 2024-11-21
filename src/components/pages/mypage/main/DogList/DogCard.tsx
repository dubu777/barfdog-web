import * as styles from "@/components/pages/mypage/main/DogList/DogList.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Badge from "@/components/common/badge/Badge";
import DogButtonControls from "@/components/pages/mypage/main/DogList/DogButtonControls";
import DogRepresentative from "@/components/pages/mypage/main/DogList/DogRepresentative";
import { DogData } from "@/types/myPage";
import { subscribeStatus } from "@/constants";

interface MyPageDogCardProps {
  noData: boolean;
  dog?: DogData | undefined;
}

const DogCard = ({ dog, noData }: MyPageDogCardProps) => {
  const subscribeStatusKR = subscribeStatus[dog?.subscribeStatus];
  return (
    <div className={styles.dogSlide({ representative: dog?.representative || dog?.subscribeStatus === 'SUBSCRIBING', noDogData: noData })}>
      <DogRepresentative noData={noData} representativeDog={dog?.representative} />
      <Badge
        className={styles.subscribeStatus}
        color={!noData && dog?.subscribeStatus === 'SUBSCRIBING' && 'red'}
      >
        {!noData ? subscribeStatusKR : '구독 전'}
      </Badge>
      <div className={styles.dogContent}>
        <Image src={dog.pictureUrl ? dog.pictureUrl : NoImage} alt='반려견 이미지' width={67} height={67} style={{ borderRadius: '50%' }} />
        <div className={styles.dogTextBox}>
          <div style={{ marginBottom: '7px' }}>
            <Text type='description' size='sm' weight='bold' pageName='myPage'>{!noData ? dog.name : '멍댕이'}</Text>
          </div>
          <Text type='description' size='xs' pageName='myPage'>구독 플랜: {!noData ? dog.plan : '미정'}</Text>
          <Text type='description' size='xs' pageName='myPage'>선택 레시피: {!noData ? dog.recipeNames : '미정'}</Text>
        </div>
      </div>
      <ul className={styles.subscribeDateBox}>
        <li className={styles.productionDate}>
          생산 예정일: {!noData ? '2024.07.24.' : '미정'}
        </li>
        <li>수령 예정일: {!noData ? '2024.07.24.' : '미정'}</li>
      </ul>
      <DogButtonControls
        subscribeId={dog?.subscribeId}
        status={!noData ? dog?.subscribeStatus : 'BEFORE_PAYMENT'}
        dogName={dog?.name}
      />
      {noData &&
        <div className={styles.noDogDataContainer}>
          <Text type='title' size='lg' color='white'>
            아직 구독 전이시네요!<br/>
            지금 설문하고 보호자님의 반려견만을 위한<br/>
            건강한 식사를 구독해보세요!
          </Text>
          <div style={{ width: '228px', margin: '13px auto 0' }}>
            <DefaultButton type='main'>설문하고 구독 시작하기</DefaultButton>
          </div>
        </div>
      }
    </div>
  );
};

export default DogCard;