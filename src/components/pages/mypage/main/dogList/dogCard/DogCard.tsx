import * as styles from "../DogList.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Badge from "@/components/common/badge/Badge";
import DogButtonControls from "@/components/pages/mypage/main/dogList/dogButtonContols/DogButtonControls";
import DogRepresentative from "@/components/pages/mypage/main/dogList/dogRepresentative/DogRepresentative";
import { DogData } from "@/types/dogs";
import { subscribeStatus } from "@/constants";
import {getProductionDates} from "@/utils/getProductionDates";

interface MyPageDogCardProps {
  noData: boolean;
  dog?: DogData;
}

const DogCard = ({ dog, noData }: MyPageDogCardProps) => {
  const subscribeStatusKR = dog && subscribeStatus[dog.subscribeStatus];
  const productionDates = 
    dog && typeof dog.nextDeliveryDate === 'string' 
    ? getProductionDates(dog.nextDeliveryDate) : undefined;
  
  return (
    <div className={styles.dogSlide({ representative: dog && dog.representative || dog && dog.subscribeStatus === 'SUBSCRIBING', noDogData: noData })}>
      <DogRepresentative noData={noData} representativeDog={dog ? dog.representative : false} />
      <Badge
        className={styles.subscribeStatus}
        color={!noData && dog?.subscribeStatus === 'SUBSCRIBING' ? 'red' : undefined}
      >
        {!noData ? subscribeStatusKR : '구독 전'}
      </Badge>
      <div className={styles.dogContent}>
        <Image src={dog && dog.pictureUrl ? dog.pictureUrl : NoImage} alt='반려견 이미지' width={67} height={67} style={{ borderRadius: '50%' }} />
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