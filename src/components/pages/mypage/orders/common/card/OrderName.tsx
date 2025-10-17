import Text from "@/components/common/text/Text";

interface OrderNameProps {
  name: string;
}

export default function OrderName({ 
  name
}: OrderNameProps) {
  return (
    <Text type="headline3">{name}</Text>
  );
}