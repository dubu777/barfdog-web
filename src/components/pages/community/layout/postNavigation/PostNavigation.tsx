import { useRouter } from "next/navigation";
import * as styles from './PostNavigation.css';
import { pointColor } from "@/styles/common.css";
import Arrow from '/public/images/icons/angle-down.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { CommunityCategory, CommunityListItem } from "@/types";

interface PostNavigationProps {
  categoryLabel: string;
  categoryPointLabel: string;
  id: number;
  title: string;
  prefetchFn: (queryClient: QueryClient, id: number) => Promise<void>;
  category: CommunityCategory;
  prevPost: CommunityListItem | null;
  nextPost: CommunityListItem | null;
}

const PostNavigation = ({
  categoryLabel,
  categoryPointLabel,
  title,
  prefetchFn,
  category,
  prevPost,
  nextPost
}: PostNavigationProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleNavigate = async (id: number) => {
    await prefetchFn(queryClient, id);
    router.push(`/community/${category}/${id}`);
  }
  return (
    <div className={styles.postNavigationContainer}>
      <div className={styles.postNavigationHeader}>
        <DefaultText type='headline1'>
          {categoryLabel} <span className={pointColor}>{categoryPointLabel}</span> 게시글
        </DefaultText>
        <button onClick={() => router.push(`/community/${category}`)} className={styles.postNavigationGoBack}>
          <DefaultText type='headline4' color='gray500'>
            목록 보기
          </DefaultText>
          <SvgIcon src={Arrow} color='gray500' size={16} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </div>
      <Divider thickness={2} color='gray50' />
      <div>
        <div>
          {prevPost &&
            <button onClick={() => handleNavigate(prevPost.id)} className={styles.postNavigationButton}>
              <DefaultText type='label3'>
                {prevPost.title}
              </DefaultText>
            </button>
          }
          <button className={`${styles.postNavigationButton} ${styles.currentItem}`} disabled>
            <DefaultText type='label3'>
              {title}
            </DefaultText>
          </button>
          {nextPost &&
            <button onClick={() => handleNavigate(nextPost.id)} className={styles.postNavigationButton}>
              <DefaultText type='label3'>
                {nextPost.title}
              </DefaultText>
            </button>
          }
        </div>
        <Divider thickness={2} color='gray50' />
      </div>
    </div>
  );
};

export default PostNavigation;