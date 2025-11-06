import { useState } from "react";
import * as styles from './ImageLoadingSpinner.css';
import Image from "next/image";
import Spinner from "@/components/ui/spinner/Spinner";

interface ImageLoadingSpinnerProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain';
  className?: string;
}

export default function ImageLoadingSpinner({ src, alt, fill = false, width, height, objectFit = 'cover', className }: ImageLoadingSpinnerProps) {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = () => {
    setLoading(false);
  }
  return (
    <div className={styles.imageLoadingSpinner} style={{ height: height }}>
      {loading && <Spinner />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        style={{ objectFit }}
        onLoad={handleLoadingComplete}
        className={className || ''}
        priority
      />
    </div>
  );
};