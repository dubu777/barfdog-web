import {ReactNode, useState} from 'react';
import { motion } from 'framer-motion';
import * as styles from './Accordion.css';
import AccordionIcon from '/public/images/icons/accordion.svg';

interface AccordionProps {
  title: string | ReactNode;
  children?: ReactNode;
  open?: boolean;
  showArrow?: boolean;
}

const Accordion = ({ title, children, open = false, showArrow = true }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={styles.accordionContainer}>
      <button onClick={toggleAccordion} className={styles.accordionButton({ noChildren: !children })}>
        {title}
        {showArrow &&
          <span className={styles.accordionIcon({ isOpen: isOpen })}>
            <AccordionIcon />
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
          <div className={styles.accordionContent}>{children}</div>
        </motion.div>
      }
    </div>
  );
};

export default Accordion;