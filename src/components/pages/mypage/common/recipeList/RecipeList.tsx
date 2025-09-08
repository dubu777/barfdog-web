import * as styles from '../information/Information.css';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import { divider } from "@/components/pages/mypage/common/cards/Card.css";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";

interface RecipeItem {
	id: number;
	imageUrl: string;
	recipeNames: string;
	oneMealGramsPerRecipe: string;
	numberOfPacksPerDay: number;
	weeklyPaymentCycle: number;
	totalNumberOfPacks: number;
	perPrice: number;
}

interface RecipeListProps {
	data: any;
}

const RecipeList = ({ data }: RecipeListProps) => {
	const planInfo = subscriptionPlanInfo[data?.plan];
	const oneMealGramsPerRecipes = data.oneMealGramsPerRecipe.split(',');
	const eachNumberOfPacks = planInfo.totalNumberOfPacks / data.recipeList.length;
	const totalGrams = oneMealGramsPerRecipes.reduce((sum, item) => Number(sum) + Number(item), 0);

	const recipeList: RecipeItem[] = data.recipeList.map((recipe, index) =>
		({
			...recipe,
			oneMealGramsPerRecipe: Number(oneMealGramsPerRecipes[index]),
			totalNumberOfPacks: eachNumberOfPacks,
			numberOfPacksPerDay: planInfo.numberOfPacksPerDay,
			weeklyPaymentCycle: planInfo.weeklyPaymentCycle,
			perPrice: Math.round((Number(oneMealGramsPerRecipes[index]) / totalGrams) * data.nextPaymentPrice),
		})
	)
	return (
		<ul className={styles.infoBoxItemColumn}>
			{recipeList.map((recipe, index) => (
				<>
					<li key={recipe.id} className={styles.infoBoxItem}>
						<Image src={recipe.imageUrl} alt={recipe.recipeNames} width={88} height={88} style={{ borderRadius: '8px' }} />
						<div className={styles.subscriptionCardInfo}>
							<div>
								<Text type='headline2'>{recipe.recipeNames}</Text>
								<Text type='body3' color='gray600' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									{recipe.oneMealGramsPerRecipe}g <span className={divider}/>
									{numberOfPacksPerDay[recipe.numberOfPacksPerDay]}<span className={divider}/>
									{recipe.weeklyPaymentCycle}주<span className={divider}/>
									{recipe.totalNumberOfPacks}팩
								</Text>
							</div>
							<Text type='headline2'>{recipe.perPrice.toLocaleString()}원</Text>
						</div>
					</li>
					{index !== recipeList.length - 1 &&
					<Divider thickness={1} color='gray200' />
					}
				</>
			))}
		</ul>
	);
};

export default RecipeList;