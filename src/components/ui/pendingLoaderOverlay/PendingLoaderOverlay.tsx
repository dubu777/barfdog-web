import { paymentLoaderContainer } from "./PendingLoaderOverlay.css";
import Text from "@/components/ui/text/Text";
import Spinner from "@/components/ui/spinner/Spinner";

interface PendingLoaderOverlayProps {
  text?: string;
}

export default function PendingLoaderOverlay({
  text,
}: PendingLoaderOverlayProps) {
  return (
    <div className={paymentLoaderContainer}>
      <Spinner />
      {text && (
        <Text type="body2" color="gray100">
          {text}
        </Text>
      )}
    </div>
  );
}
