import FirstTimeRegistration from "./firstTimeRegistration/FirstTimeRegistration";
import * as styles from "./DietAnalysisPageContainer.css";
export default function DietAnalysisPageContainer() {
  return (
    <main className={styles.dietAnalysisPageContainer}>
      <FirstTimeRegistration />
    </main>
  );
}