export { RecipeDto };

interface RecipeDto {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  gramPerKcal: number;
  imgUrl: string;
  inStock: boolean,
  ingredients?: string;
  leaked?: string;
  modifiedDate?: string;
}

