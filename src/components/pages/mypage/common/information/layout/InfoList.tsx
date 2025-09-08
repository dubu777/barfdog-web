import * as styles from '../Information.css';
import Text from "@/components/common/text/Text";

interface InfoItem {
	label: string;
	value: string | number;
}

interface InfoSectionProps {
	title?: string;
	items: InfoItem[] | undefined;
	noBorder?: boolean;
}

const InfoList = ({ title, items, noBorder = false }: InfoSectionProps) => {
	return (
		<div className={styles.infoListBox({ noBorder })}>
			{title &&
				<Text type="label3" className={styles.infoListTitle}>{title}</Text>
			}
			<ul className={styles.infoList}>
				{items?.map((item, index) => (
					item && (
						<li key={`${title}-${index}`} className={styles.infoItem}>
							<Text type="label4">{item?.label}</Text>
							<Text type="body3">{item?.value}</Text>
						</li>
					)
				))}
			</ul>
		</div>
	);
};
export default InfoList;