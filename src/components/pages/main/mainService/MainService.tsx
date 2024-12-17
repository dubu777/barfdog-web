import * as styles from './MainService.css';
import Image from "next/image";
import Text from '@/components/common/text/Text';
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { servicesByBarfdogList } from "@/constants";

const MainService = () => {
  const { isMobile } = useBreakpoints();
  return (
    <article className={styles.mainServiceWrapper}>
      <div className={styles.mainServiceBox}>
        <div style={{ marginBottom: isMobile ? '12px' : '4px' }}>
          <Text type='title' size='titleLg' weight='bold'>
            내 가족이 먹는{isMobile && <br/>}안심 식단
          </Text>
        </div>
        <Text type='description' size='sm' color='grey'>
          비교해 볼수록, 고민해 볼수록, 찾아볼수록,<br/>바프독은 최고의 서비스를 제공합니다
        </Text>
      </div>
      <ul className={styles.mainServiceBox}>
        {servicesByBarfdogList?.map(item => (
          <li key={item.key} className={styles.mainServiceListItem}>
            <Text type='title' size='md'>
              {item.title}
            </Text>
            <div style={{ margin: `${isMobile ? '12' : '15'}px 0 17px`, lineHeight: '20px' }}>
              <Text type='description' size='sm' color='grey'>
                {item.description}
              </Text>
            </div>
            <div>
              <Image src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
          </li>
        ))}
      </ul>
      <Text type='description' size='md' weight='bold' color='black'>
        바프독의 제품 안심하고 드실 수 있도록<br/>항상 최선을 다해 만들겠습니다
      </Text>
    </article>
  );
};

export default MainService;