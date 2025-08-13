import { useState } from "react";
import useModal from "./useModal";

export function useImageModal() {
  const [defaultImageIndex, setDefaultImageIndex] = useState(0);
  const { isOpen, onClose, onToggle } = useModal();

  const handleThumbnailClick = (index: number) => {
    setDefaultImageIndex(index);
    onToggle();
  };

  return {
    isOpen,
    onClose,
    onToggle,
    defaultImageIndex,
    handleThumbnailClick,
    setDefaultImageIndex,
  };
}
