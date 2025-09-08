import Divider from "../divider/Divider";
import { COLORS } from "@/constants/style";

interface ListDividerProps {
  listLength: number;
  index: number;
  color?: keyof typeof COLORS;
}

export default function ListDivider({ listLength, index, color = 'gray200' }: ListDividerProps) {
  return (
    <>
      {index !== listLength - 1 && <Divider thickness={1} color={color} />}
    </>
  );
}