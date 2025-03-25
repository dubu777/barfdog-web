"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackBarStore } from "@/store/useSnackBar";
import * as styles from "./SnackBar.css";
import Button from "../button/Button";
import DefaultText from "../defaultText/DefaultText";

interface SnackBarItemProps {
  id: string;
  title: string;
  caption?: string;
  actionLabel?: string;
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
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.snackBarItem}
    >
      <div className={styles.snackBarContent}>
        <DefaultText type="label3" color="gray0">{title}</DefaultText>
        {caption && <DefaultText type="caption" color="gray200">{caption}</DefaultText>}
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
  const position = currentSnackBar?.position || "bottom";
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
