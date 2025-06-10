import * as styles from '../Information.css';
import DefaultText from "@/components/common/defaultText/DefaultText";

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
				<DefaultText type="label3" className={styles.infoListTitle}>{title}</DefaultText>
			}
			<ul className={styles.infoList}>
				{items?.map((item, index) => (
					item && (
						<li key={`${title}-${index}`} className={styles.infoItem}>
							<DefaultText type="label4">{item?.label}</DefaultText>
							<DefaultText type="body3">{item?.value}</DefaultText>
						</li>
					)
				))}
			</ul>
		</div>
	);
};
export default InfoList;