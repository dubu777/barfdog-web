import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import * as styles from './Accordion.css';
import AccordionIcon from '/public/images/icons/accordion.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface AccordionProps {
  title: string | ReactNode;
  children?: ReactNode;
  open?: boolean;
  showArrow?: boolean;
  buttonClassName?: string;
  contentClassName?: string;
}

const Accordion = ({ title, children, open = false, showArrow = true, buttonClassName, contentClassName }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={styles.accordionContainer}>
      <button onClick={toggleAccordion} className={`${styles.accordionButton({ noChildren: !children })} ${buttonClassName || ''}`}>
        {title}
        {showArrow &&
          <span className={styles.accordionIcon({ isOpen: isOpen })}>
            <SvgIcon src={AccordionIcon} size={12} />
          </span>
        }
      </button>
      {children &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={styles.accordionMotionDiv}
        >
          <div className={`${styles.accordionContent} ${contentClassName || ''}`}>{children}</div>
        </motion.div>
      }
    </div>
  );
};

export default Accordion;