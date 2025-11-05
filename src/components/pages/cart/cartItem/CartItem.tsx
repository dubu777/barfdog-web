import { commonWrapper } from '@/styles/common.css';
import { cartItemBox, cartItemImage, cartItemOptionBox, deleteButton } from './CartItem.css';
import Image from "next/image";
import CloseIcon from "/public/images/header/close.svg";
import InfoIcon from '/public/images/icons/info-fill.svg';
import Counter from "@/components/ui/counter/Counter";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";
import Chips from "@/components/ui/chips/Chips";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { CartItemDto, CartItemOptionDto } from "@/types/cart";
import { useCart } from "@/hooks/cart/useCart";

interface CartItemProps {
  item: CartItemDto;
  options: CartItemOptionDto[];
  isSelected: boolean;
  onSelect: () => void;
  isSoldOut?: boolean;
}

export default function CartItem({
  item,
  options,
  isSelected,
  onSelect,
  isSoldOut = false,
}: CartItemProps) {
  const { handleItemAmountChange, handleItemOptionAmountChange, handleDeleteItemById } = useCart();

  const ItemContent = () => {
    return (
      <div className={commonWrapper({ justify: 'start', align: 'start', gap: 8 })}>
        <Image 
          src={item.thumbnailUrl} 
          alt={item.name} 
          width={88} 
          height={88} 
          className={cartItemImage({ isSoldOut })} 
        />
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 4 })}>
          <Text type='label2' color='gray700'>
            {item.name}
          </Text>
          {isSoldOut
            ? <Text type='headline1' color='red'>Sold Out</Text>
            : (
              <>
                <Text type='body3' color='gray600' block>구매 수량 | {item.amount}개</Text>
                <div className={commonWrapper({ justify: 'between', align: 'end' })}>
                  <div className={commonWrapper({ direction: 'col', align: 'start',  gap: 2 })}>
                    {item.originalPrice !== item.salePrice &&
                      <Text type='caption2' color='gray800' lineThrough>
                        {item.originalPrice.toLocaleString()}원
                      </Text>
                    }
                    <Text type='headline2' color='gray800'>{item.salePrice.toLocaleString()}원</Text>
                  </div>
                  <Counter
                    min={1}
                    initialCount={item.amount}
                    onChange={(value, type) => handleItemAmountChange(item.basketId, value, type)}
                  />
                </div>
              </>
            )
          }
        </div>
      </div>
    )
  }

  return (
    !isSoldOut ? (
      <LabeledCheckbox
        value={isSelected}
        isChecked={isSelected}
        onToggle={onSelect}
        iconClick
        direction='col'
        className={cartItemBox}
      >
        <button
          onClick={() => handleDeleteItemById(item.basketId)}
          className={deleteButton}
        >
          <SvgIcon src={CloseIcon} size={20} color='gray500' />
        </button>
        <ItemContent />
        {options.length > 0 &&
          <div className={commonWrapper({
            direction: 'col',
            align: 'start',
            gap: 12
          })}>
            {options.map(option => {
              const isOptionSoldOut = false;
              return (
                <Card
                  key={option.id}
                  shadow='none'
                  backgroundColor='gray100'
                  direction='col'
                  gap={8}
                  padding={12}
                  align='start'
                  justify='start'
                >
                  <div className={cartItemOptionBox({ isOptionSoldOut })}>
                    <div className={commonWrapper({ justify: 'between' })}>
                      <Chips variant='outlined' color='gray700'>{isOptionSoldOut ? '품절' : '추가'}상품</Chips>
                      <button>
                        <SvgIcon src={CloseIcon} size={16} color='gray500' />
                      </button>
                    </div>
                    <Text type='body3' color='gray700'>{option.name}</Text>
                  </div>
                  <div className={commonWrapper({ justify: 'between' })}>
                    {isOptionSoldOut
                      ? <Text type='headline1' color='red'>Sold Out</Text>
                      : (
                        <>
                          <Text type='label3' color='gray800'>{option.optionPrice.toLocaleString()}원</Text>
                          <Counter
                            min={1}
                            initialCount={option.amount}
                            onChange={(value) => handleItemOptionAmountChange(item.basketId, option.id, value)}
                          />
                        </>
                      )
                    }
                  </div>
                </Card>
              )
            })}
          </div>
        }
      </LabeledCheckbox>
    ) : (
      <div className={cartItemBox}>
        <div className={commonWrapper({ justify: 'between' })}>
          <SvgIcon src={InfoIcon} size={18} color='gray700' />
          <button onClick={() => handleDeleteItemById(item.basketId)}>
            <SvgIcon src={CloseIcon} size={20} color='gray500' />
          </button>
        </div>
        <ItemContent />
      </div>
    )
  );
};