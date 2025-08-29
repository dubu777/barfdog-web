import { DogData } from "./dogs";
import { SUBSCRIPTION_ORDER_STATUSES } from "@/constants/mypage";
import { PlanInfo } from "@/types/subscription";
import { OrderType } from "@/types/order";
import { PAYMENT_METHOD } from "@/constants";

export type {
  MyPageMemberDto,
  MyPageRepresentativeDogDto,
  MyPageInfoData,
  MyPageBannerData,
  OrderProgressInfo,
  MenuLink,
  MenuList,
  VariantsType,
  OrderAction,
  IsOpenCardModal,
  NormalizedCardData,
  NormalizedOrderCardData,
  NormalizedSubscriptionCardData,
  CardActionsId,
  SubscriptionOrderStatus,
  SubscriptionCancelOrderStatus,
  OrderDeliveryInquiryStatus,
  InfoLists,
  InfoListsButtons,
  InfoListsItem,
  PaymentItem,
  PaymentSubscriptionCard,
  SendMessage,
};

interface MyPageMemberDto {
  id: number;
  grade: string;
  memberName: string;
  myRecommendationCode: string;
  reward: number;
  imageUrl?: string;
}

interface MyPageRepresentativeDogDto {
  dogName: string;
  inStock: boolean;
  recipeName: string;
  thumbnailUrl?: null | string;
}

interface MyPageInfoData {
  couponCount: number;
  deliveryCount: number;
  mypageDogDtoList?: null | DogData[];
  mypageMemberDto: MyPageMemberDto;
  mypageRepresentiveDogDto: MyPageRepresentativeDogDto;
}

interface MyPageBannerImageUrl {
  pc: string;
  mobile: string;
}

interface MyPageBannerData {
  id: number;
  name: string;
  status: string;
  filenamePc: string;
  filenameMobile: string;
  pcLinkUrl: string;
  mobileLinkUrl: string;
  imageUrl: MyPageBannerImageUrl;
}

interface OrderProgressInfo {
  label?: string;
  progress: number;
  statusText: Record<'payment' | 'delivery', string>;
}

interface MenuLink {
  key?: string;
  label: string;
  url?: string;
  action?: () => void;
}

interface MenuList {
  category: string;
  menus: MenuLink[];
}
type VariantsType = 'solid' | 'outline'

interface OrderAction extends MenuLink {
  id?: CardActionsId;
  variants?: VariantsType;
  params?: string;
  fullWidth?: boolean;
}

interface IsOpenCardModal {
  id: CardActionsId | null;
  isOpen: boolean;
  subscriptionId?: number;
}

type CardActionsId =
  'orderDetail' |
  'orderCancel' |
  'deliveryTracking' |
  'refundExchange' |
  'confirm' |
  'review' |
  'subscriptionDetail' |
  'subscriptionSchedule' |
  'itemDetail' |
  'repurchase' |
  'changePaymentMethod' |
  'changeRecipe' |
  'postponeShipping' |
  'recipeDetail' |
  'usingCoupon' |
  'resubscribe';

interface NormalizedCardData {
  id: number;
  name: string;
  imageUrl: string;
  itemName: string;
  price?: number;
  plan: PlanInfo;
  orderType: OrderType;
  status: string;
  orderStatus?: string;
  subscribeCount?: number;
  amount?: number | null;
  optionNames?: string;
  nextPaymentDate?: string;

  orderDate?: string;
  cancelDate?: string;
  subscribeId?: string | number;
}

interface NormalizedOrderCardData extends NormalizedCardData{
  subscribeId?: number;
}

interface NormalizedSubscriptionCardData extends NormalizedCardData{
  startDate?: string;
  hasPostpone?: boolean;
}

type SubscriptionOrderStatus = (typeof SUBSCRIPTION_ORDER_STATUSES)[number];
type OrderDeliveryInquiryStatus = 'REVIEW_SUBMIT' | SubscriptionOrderStatus;

type ExcludedStatuses =
  | 'SUBSCRIBE_PENDING'
  | 'SUBSCRIBE_WILL_CANCEL'
  | 'SUBSCRIBE_CANCEL';

type SubscriptionCancelOrderStatus = Exclude<SubscriptionOrderStatus, ExcludedStatuses>;

interface InfoListsItem {
	label: string;
	value: string | number;
}

interface InfoListsButtons {
	label: string;
	onClick: () => void;
}

interface InfoLists {
	title?: string;
	items: InfoListsItem[] | undefined;
	noBorder?: boolean
}

interface PaymentSubscriptionCard {
  cardId: number;
  cardName: string | null,
  cardNumber: string | null,
  detailAddress: string;
  discountCoupon: number;
  discountGrade: number;
  dogName: string;
  email: string;
  name: string;
  street: string;
  plan: string;
  nextPaymentDate: string | null,
  nextPaymentPrice: number;
  phoneNumber: string;
  overDiscount: number;
  subscribeId: number;
  status: string | keyof typeof SUBSCRIPTION_ORDER_STATUSES;
  recipientName?: number;
  discountReward?: number;
}

interface PaymentItem {
  subscribeCardDto: PaymentSubscriptionCard;
  paymentMethod: keyof typeof PAYMENT_METHOD;
  recipeNameList: string[];
}

interface SendMessage {
  name: string;
  phone: string;
  homePageUrl?: string;
}