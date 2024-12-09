'use client';
import * as styles from './DefaultAddress.css';
import { inlineBlockSpan, pointColor } from "@/styles/common.css";
import { usePathname } from "next/navigation";
import RightArrowIcon from "/public/images/icons/right-arrow-black.svg";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useMyPageStore } from "@/store/useMypageStore";
import { getProductionDates } from "@/utils/getProductionDates";
import { SubscribeAddressData } from "@/types/subscription";
import { DefaultObjectType } from "@/types/common";

interface DefaultAddressProps {
  addressData: SubscribeAddressData;
  changeTypeList: DefaultObjectType[];
}

const DefaultAddress = ({ addressData, changeTypeList }: DefaultAddressProps) => {
  const { currentAddress: currentData, nextAddress: nextData, nextDeliveryDate } = addressData;
  const { subscribeDogName } = useMyPageStore();
  const { pushWithQuery } = useDynamicQueryPush();
  const defaultProductionDates = getProductionDates(nextDeliveryDate);
  const pathname = usePathname();

  const emptyValue = (data: string, title?: string) => data ? data : title ? title : '-'
  const handleChangeType = (type: string) => {
    pushWithQuery(pathname, { changeType: type })
  }
  
  return (
    <section>
      <h2 className={styles.addressInfoTitle}>
        반려견마다 다른 배송지를 설정할 수 있습니다.<br/>
        <span className={pointColor}>
        변경 후 &apos;최종 저장&apos;을 눌러야 저장됩니다.
      </span>
      </h2>
      <article className={styles.addressBox}>
        <div className={styles.subscribeDogName}>
          <Text type='title' size='md' align='left'>{subscribeDogName}(이)네</Text>
        </div>
        <div className={styles.addressContents}>
          <Text type='title' size='md' align='left'>현재 배송지</Text>
          <Text type='description' size='md' align='left' color='black' weight='normal'>
            ({currentData.zipcode}) {currentData.street}, <br/>
            {currentData.detailAddress}
          </Text>
          <Text type='description' size='sm' align='left' color='black'>
            {currentData.recipientName}<span>{formatPhoneNumber(currentData.phoneNumber)}</span>
          </Text>
        </div>
        <div className={styles.addressContents}>
          <Text type='description' size='sm' align='left' color='grey'>다음 배송지</Text>
          <Text type='description' size='sm' align='left' color='grey' weight='normal'>
            ({emptyValue(nextData?.zipcode, '우편번호')}) {emptyValue(nextData?.street, '주소')}, <br/>
            {emptyValue(nextData?.detailAddress, '나머지 주소')}
          </Text>
          <Text type='description' size='sm' align='left' color='grey'>
            {emptyValue(nextData?.recipientName)}&nbsp;<span>{formatPhoneNumber(nextData?.phoneNumber)}</span>
          </Text>
        </div>
        <div className={styles.productionDates}>
          <Text type='description' size='md' weight='light' align='left' color='grey'>정기구독</Text>
          <Text type='description' size='md' weight='light' align='left' color='grey'>
            (생산 예정일: {defaultProductionDates.productionDate} / 수령 예정일: {defaultProductionDates.receivingDate})
          </Text>
        </div>
        <div className={styles.changeButtons}>
          {changeTypeList.map(type => (
            <DefaultButton
              key={type.id}
              onClick={() => handleChangeType(String(type.value))}
              type='blackBorder'
              borderRadius='lg'
            >
              {type.name} <span className={inlineBlockSpan}><RightArrowIcon /></span>
            </DefaultButton>
          ))}
        </div>
      </article>
    </section>
  );
};

export default DefaultAddress;