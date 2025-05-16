import FirstTimeRegistration from "./firstTimeRegistration/FirstTimeRegistration";
import * as styles from "./DietAnalysisPageContainer.css";
import RegisteredDogManager from "./registeredDogManager/RegisteredDogManager";
export default function DietAnalysisPageContainer() {
  const isFirstTime = false;
  return (
    <>{isFirstTime ? <FirstTimeRegistration /> : <RegisteredDogManager />}</>
  );
}
