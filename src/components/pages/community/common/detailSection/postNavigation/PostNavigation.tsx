import { useRouter, useSearchParams } from "next/navigation";
import { commonWrapper, pointColor } from "@/styles/common.css";
import Arrow from '/public/images/icons/angle-down.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
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

export default function PostNavigation({
  categoryLabel,
  categoryPointLabel,
  title,
  prefetchFn,
  category,
  prevPost,
  nextPost
}: PostNavigationProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleNavigate = async (id: number) => {
    await prefetchFn(queryClient, id);
    router.push(`/community/${category}/${id}${categoryParam ? `?category=${categoryParam}` : ''}`);
  }
  return (
    <div className={commonWrapper({ paddingBottom: 20, direction: 'col', align: 'start' })}>
      <div 
        className={commonWrapper({
          direction: 'row',
          justify: 'between',
          align: 'center',
          padding: 20,
          paddingBottom: 12,
          backgroundColors: 'gray0',
        })}
      >
        <Text type='headline1'>
          {categoryLabel} <span className={pointColor}>{categoryPointLabel}</span> 게시글
        </Text>
        <button onClick={() => router.push(`/community/${category}`)} className={commonWrapper({ width: 'auto', gap: 4 })}>
          <Text type='headline4' color='gray500'>
            목록 보기
          </Text>
          <SvgIcon src={Arrow} color='gray500' size={16} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </div>
      <Divider thickness={2} color='gray50' />
      {prevPost &&
        <button 
          onClick={() => handleNavigate(prevPost.id)} 
          className={commonWrapper({
            width: 'full',
            padding: '12/20',
            justify: 'start',
          })}
        >
          <Text type='label3'>
            {prevPost.title}
          </Text>
        </button>
      }
      <button 
        disabled
        className={commonWrapper({
          width: 'full',
          padding: '12/20',
          justify: 'start',
          backgroundColors: 'gray100',
        })}
      >
        <Text type='label3'>
          {title}
        </Text>
      </button>
      {nextPost &&
        <button 
          onClick={() => handleNavigate(nextPost.id)} 
          className={commonWrapper({
            width: 'full',
            padding: '12/20',
            justify: 'start',
          })}
        >
          <Text type='label3'>
            {nextPost.title}
          </Text>
        </button>
      }
      <Divider thickness={2} color='gray50' />
    </div>
  );
};