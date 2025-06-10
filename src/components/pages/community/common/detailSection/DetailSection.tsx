import * as styles from './DetailSection.css';
import { sanitizedHTML } from "@/styles/common.css";
import { format } from "date-fns";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import PostNavigation from "@/components/pages/community/layout/postNavigation/PostNavigation";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { QueryClient } from "@tanstack/react-query";
import { CommunityListItem } from "@/types";

interface DetailSectionProps {
	id: number;
	title: string;
	createdDate: string;
	contents: string;
	category: 'notice' | 'article';
	categoryLabel: string;
	categoryPointLabel: string;
	prevPost: CommunityListItem | null;
	nextPost: CommunityListItem | null;
	prefetchFn: (queryClient: QueryClient, id: number) => Promise<void>;
}

const DetailSection = ({
	id,
	title,
	createdDate,
	contents,
	category,
	categoryLabel,
	categoryPointLabel,
	prevPost,
	nextPost,
	prefetchFn,
}: DetailSectionProps) => {
	const sanitizedHTMLContents = useSanitizedHTML(contents || '')
	return (
		<section className={styles.detailContainer}>
			<article className={styles.detailHeader}>
				<DefaultText type='title4'>{title}</DefaultText>
				<DefaultText type='body3' color='gray600'>{format(new Date(createdDate), 'yyyy-MM-dd')}</DefaultText>
			</article>
			<div className={styles.detailContents}>
				<div dangerouslySetInnerHTML={{ __html: sanitizedHTMLContents }} className={sanitizedHTML} />
			</div>
			<Divider thickness={8} color='gray50' />
			<PostNavigation
				categoryLabel={categoryLabel}
				categoryPointLabel={categoryPointLabel}
				id={id}
				title={title}
				prefetchFn={prefetchFn}
				category={category}
				prevPost={prevPost}
				nextPost={nextPost}
			/>
		</section>
	);
};

export default DetailSection;