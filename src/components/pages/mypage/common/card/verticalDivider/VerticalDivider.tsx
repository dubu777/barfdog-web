import Divider from "@/components/ui/divider/Divider";

export default function VerticalDivider() {
  return (
    <span style={{ height: '12px' }}>
      <Divider direction="vertical" color="gray200" thickness={1} />
    </span>
  );
}