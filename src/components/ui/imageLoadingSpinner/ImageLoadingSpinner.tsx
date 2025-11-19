import { useState } from "react";
import * as styles from "./ImageLoadingSpinner.css";
import Image from "next/image";
import Spinner from "@/components/ui/spinner/Spinner";

interface ImageLoadingSpinnerProps {
  src: string;
  alt: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";
  className?: string;
}

export default function ImageLoadingSpinner({
  src,
  alt,
  fill = false,
  className,
}: ImageLoadingSpinnerProps) {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  return (
    <div className={styles.imageLoadingSpinner}>
      {loading && <Spinner />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        onLoad={handleLoadingComplete}
        className={className || ""}
        priority
      />
    </div>
  );
}
