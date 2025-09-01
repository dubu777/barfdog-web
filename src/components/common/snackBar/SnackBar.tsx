"use client";

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackBarStore } from "@/store/useSnackBar";
import * as styles from "./SnackBar.css";
import Button from "../button/Button";
import Text from "../text/Text";
import { MOTION } from "@/constants";

interface SnackBarItemProps {
  id: string;
  title: string;
  caption?: string;
  actionLabel?: string | ReactNode;
  onActionClick?: () => void;
  onClose: () => void;
}


function SnackBarItem({
  id,
  title,
  caption,
  actionLabel,
  onActionClick,
  onClose,
}: SnackBarItemProps) {
  return (
    <motion.div
      key={id}
      variants={MOTION.SNACKBAR}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.snackBarItem}
    >
      <div className={styles.snackBarContent}>
        <Text type="label3" color="gray0">{title}</Text>
        {caption && <Text type="caption" color="gray200">{caption}</Text>}
      </div>

      {actionLabel && (
        <Button
          onClick={() => {
            onActionClick?.();
            onClose();
          }}
          type="assistive"
          variant="text"
          textColor="gray0"
          size="lg"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

export default function SnackBar() {
  const { currentSnackBar, removeSnackBar } = useSnackBarStore();
  const [position, setPosition] = useState("bottom");

  useEffect(() => {
    if (currentSnackBar && currentSnackBar.position) {
      setPosition(currentSnackBar.position);
    }
  }, [currentSnackBar]);
  return (
    <div className={`${styles.snackBarContainer} ${styles.snackBarPosition[position]}`}>
      <AnimatePresence>
        {currentSnackBar && (
          <SnackBarItem
            key={currentSnackBar.id}
            id={currentSnackBar.id}
            title={currentSnackBar.title}
            caption={currentSnackBar.caption}
            actionLabel={currentSnackBar.actionLabel}
            onActionClick={currentSnackBar.onActionClick}
            onClose={removeSnackBar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
