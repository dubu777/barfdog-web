import { TextColor } from "@/types/typography";
import Divider from "../divider/Divider";

interface ListDividerProps {
  listLength: number;
  index: number;
  color?: TextColor;
  thickness?: 1 | 2 | 4 | 6 | 8 | 12;
  direction?: 'horizontal' | 'vertical';
}

export default function ListDivider({ listLength, index, color = 'gray200', thickness = 1, direction = 'horizontal' }: ListDividerProps) {
  return (
    <>
      {index !== listLength - 1 && <Divider thickness={thickness} color={color} direction={direction} />}
    </>
  );
}