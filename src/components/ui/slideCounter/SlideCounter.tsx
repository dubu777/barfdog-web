import * as styles from "./SlideCounter.css";
import Chips from "../chips/Chips";
import Text from "../text/Text";

interface SlideCounterProps {
  currentSlide: number;
  totalSlides: number;
  chipColor?: 'dimmed' | 'red';
  chipSize?: 'sm' | 'md';
  styleType?: 'chip' | 'text';
  textColor?: 'white' | 'black';
  className?: string;
}

export default function SlideCounter({
  currentSlide,
  totalSlides,
  chipColor = 'dimmed',
  chipSize = 'md',
  styleType = 'chip',
  textColor = 'white',
  className,
}: SlideCounterProps) {
  return (
    <>
      {styleType === 'chip' && 
        <Chips 
          color={chipColor} 
          variant='solid' 
          size={chipSize}
          borderRadius='lg'
          className={className ?? ''}
        >
          <Text
            type={chipSize === 'sm' ? 'caption2' : 'headline4'} 
            color='white'
            className={styles.slideCounterText}
          >
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
            </Text>
        </Chips>
      }
      {styleType === 'text' && 
        <div className={`${styles.slideCounterText} ${className ?? ''}`}>
          <Text
            type='headline3' 
            color={textColor === 'black' ? 'gray900' : 'gray0'}
          >
            {currentSlide}
          </Text>
          <Text
            type='headline3' 
            color={textColor === 'black' ? 'gray500' : 'gray200'}
          >
            /
          </Text>
          <Text
            type='headline3' 
            color={textColor === 'black' ? 'gray500' : 'gray200'}
          >
            {totalSlides}
          </Text>
        </div>
      }
    </>
  );
}