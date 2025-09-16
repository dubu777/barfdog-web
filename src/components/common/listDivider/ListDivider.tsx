import Divider from "../divider/Divider";
import { COLORS } from "@/constants/style";

interface ListDividerProps {
  listLength: number;
  index: number;
  color?: keyof typeof COLORS;
  thickness?: 1 | 2 | 4 | 6 | 8 | 12;
}

export default function ListDivider({ listLength, index, color = 'gray200', thickness = 1 }: ListDividerProps) {
  return (
    <>
      {index !== listLength - 1 && <Divider thickness={thickness} color={color} />}
    </>
  );
}