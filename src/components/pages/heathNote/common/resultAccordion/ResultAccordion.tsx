import { ReactNode } from "react";
import * as styles from "./ResultAccordion.css";
import Accordion from "@/components/common/accordion/Accordion";
import Card from "@/components/common/card/Card";

interface ResultAccordionProps {
  accordionButton: ReactNode;
  children: ReactNode;
}

export default function ResultAccordion({
  accordionButton,
  children,
}: ResultAccordionProps) {
  return (
    <Card shadow="none">
      <Accordion
        showArrow
        buttonClassName={styles.resultAccordionButton}
        contentClassName={styles.resultAccordionContent}
        title={accordionButton}
      >
        {children}
      </Accordion>
    </Card>
  );
}
