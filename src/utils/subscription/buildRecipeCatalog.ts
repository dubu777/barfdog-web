import { SubscriptionOrderSheet } from "@/types";

export type RecipeCatalogValue = {
  name: string;
  url: string;
};

export type RecipeCatalogMap = Record<number, RecipeCatalogValue>;

export function buildRecipeCatalog(
  orderSheet?: SubscriptionOrderSheet
): RecipeCatalogMap {
  if (!orderSheet?.recipeList?.length) return {};

  return orderSheet.recipeList.reduce<RecipeCatalogMap>((acc, item) => {
    const name = item.recipeNameKorea?.trim();
    String(item.recipeId);

    acc[item.recipeId] = {
      name,
      url: item.displayImageUrl.url,
    };
    return acc;
  }, {});
}
