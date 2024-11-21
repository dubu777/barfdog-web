import * as styles from './RadiusSubmitButton.css';

interface RadiusSubmitButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const RadiusSubmitButton = ({ title, onClick, disabled = false }: RadiusSubmitButtonProps) => {
  return (
    <button
      className={styles.submitButton}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default RadiusSubmitButton;