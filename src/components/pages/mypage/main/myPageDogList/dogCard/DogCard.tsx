import * as styles from "../MyPageDogList.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Badge from "@/components/common/badge/Badge";
import DogButtonControls from "@/components/pages/mypage/main/myPageDogList/dogButtonContols/DogButtonControls";
import DogRepresentative from "@/components/pages/mypage/main/myPageDogList/dogRepresentative/DogRepresentative";
import { DogData } from "@/types/dogs";
import { subscriptionStatus } from "@/constants";
import { getProductionDates } from "@/utils/getProductionDates";
import DogImage from "@/components/pages/mypage/main/myPageDogList/dogImage/DogImage";

interface MyPageDogCardProps {
  noData: boolean;
  dog?: DogData;
  resetSwiper: (() => void) | undefined;
}

const DogCard = ({ dog, noData, resetSwiper }: MyPageDogCardProps) => {
  const subscriptionStatusKR = dog && subscriptionStatus[dog.subscribeStatus];
  const productionDates = 
    dog && typeof dog.nextDeliveryDate === 'string' 
    ? getProductionDates(dog.nextDeliveryDate) : undefined;

  return (
    <div className={styles.dogSlide({ representative: dog && dog.representative || dog && dog.subscribeStatus === 'SUBSCRIBING', noDogData: noData })}>
      <DogRepresentative
        noData={noData}
        representativeDog={dog ? dog.representative : false}
        dogId={dog ? dog.id : 0}
        resetSwiper={dog?.id ? resetSwiper : undefined}
      />
      <Badge
        className={styles.subscriptionStatus}
        color={!noData && dog?.subscribeStatus === 'SUBSCRIBING' ? 'redBorder' : undefined}
      >
        {!noData ? subscriptionStatusKR : '구독 전'}
      </Badge>
      <div className={styles.dogContent}>
        {dog && 
          <DogImage
            dogId={dog.id}
            dogPictureUrl={dog.pictureUrl as string}
            dogPictureName={dog.pictureName as string}
          />
        }
        <div>
          <div style={{ marginBottom: '7px' }}>
            <Text type='description' size='sm' weight='bold' pageName='myPage'>{!noData && dog ? dog.name : '멍댕이'}</Text>
          </div>
          <Text type='description' size='xs' pageName='myPage'>구독 플랜: {!noData && dog ? dog.plan : '미정'}</Text>
          <Text type='description' size='xs' pageName='myPage'>선택 레시피: {!noData && dog ? dog.recipeNames : '미정'}</Text>
        </div>
      </div>
      <ul className={styles.subscribeDateBox}>
        <li className={styles.productionDate}>
          생산 예정일: {!noData ? productionDates && productionDates.productionDate || '미정' : '미정'}
        </li>
        <li>수령 예정일: {!noData ? productionDates && productionDates.receivingDate || '미정' : '미정'}</li>
      </ul>
      {dog && 
        <DogButtonControls
          subscribeId={dog.subscribeId}
          status={!noData ? dog.subscribeStatus : 'BEFORE_PAYMENT'}
          dogName={dog.name}
        />
      }
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