import * as styles from './PostNavigation.css';
import { useRouter } from "next/navigation";
import DownArrow from '/public/images/icons/angle-down.svg';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Text from "@/components/common/text/Text";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { CommunityCategory, CommunityListItem } from "@/types";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface PostNavigationProps {
  prefetchFn: (queryClient: QueryClient, id: number) => Promise<void>;
  category: CommunityCategory;
  prevPost: CommunityListItem | null;
  nextPost: CommunityListItem | null;
}

const PostNavigation = ({ prefetchFn, category, prevPost, nextPost }: PostNavigationProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleNavigate = async (id: number) => {
    await prefetchFn(queryClient, id);
    router.push(`/community/${category}/${id}`);
  }

  return (
    <div className={styles.postNavigationContainer}>
      <div className={styles.moveToList}>
        <DefaultButton
          type='main'
          linkUrl={`/community/${category}`}
          borderRadius='sm'
        >
          목록 보기
        </DefaultButton>
      </div>
      <div className={styles.postNavigation}>
        <ul>
          {prevPost &&
          <li className={styles.navigationItem}>
            <Text type='description' size='sm' color='grey' className={styles.navTitle}>
              다음 글<SvgIcon src={DownArrow} className={styles.prevArrow} />
            </Text>
            <button onClick={() => handleNavigate(prevPost.id)} className={styles.navLink}>
              <Text type='description' size='sm' color='black'>{prevPost.title}</Text>
            </button>
          </li>
          }
          {nextPost &&
          <li className={styles.navigationItem}>
            <Text type='description' size='sm' color='grey' className={styles.navTitle}>
              이전 글<SvgIcon src={DownArrow} />
            </Text>
            <button onClick={() => handleNavigate(nextPost.id)} className={styles.navLink}>
              <Text type='description' size='sm' color='black'>{nextPost.title}</Text>
            </button>
          </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default PostNavigation;