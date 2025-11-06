import { commonWrapper, sanitizedHTML } from "@/styles/common.css";
import { format } from "date-fns";
import { QueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import PostNavigation from "@/components/pages/community/common/detailSection/postNavigation/PostNavigation";
import { CommunityListItem } from "@/types";

interface DetailSectionProps {
	id: number;
	title: string;
	createdDate?: string;
	contents: string;
	category: 'notice' | 'article';
	categoryLabel: string;
	categoryPointLabel: string;
	prevPost: CommunityListItem | null;
	nextPost: CommunityListItem | null;
	prefetchFn: (queryClient: QueryClient, id: number) => Promise<void>;
}

export default function DetailSection({
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
}: DetailSectionProps) {
	const cleanHTML = DOMPurify.sanitize(contents) ?? "";

	return (
		<section className={commonWrapper({ backgroundColors: 'gray0', direction: 'col', align: 'start' })}>
			<article 
				className={commonWrapper({ 
					direction: 'col',
					align: 'start',
					gap: 12,
					padding: 20,
					backgroundColors: 'gray50',
				})}
			>
				<Text type='title4'>{title}</Text>
				{createdDate && 
					<Text type='body3' color='gray600'>{format(new Date(createdDate), 'yyyy-MM-dd')}</Text>
				}
			</article>
			<div className={commonWrapper({ padding: 20, paddingBottom: 60, paddingTop: 60 })}>
				<div className={sanitizedHTML}>{parse(cleanHTML)}</div>
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