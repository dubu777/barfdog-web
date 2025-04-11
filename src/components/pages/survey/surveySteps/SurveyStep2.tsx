
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller } from "react-hook-form";
import useDeviceState from "@/hooks/useDeviceState";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import { formatDate } from "@/utils";
import { surveyStepContainer } from "./SurveySteps.css";
import { isValid, parseISO } from "date-fns";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";

interface SurveyStepProps {
  handleChange: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep2({
  handleChange,
  control,
  petName,
}: SurveyStepProps) {
    const { isMobileDevice } = useDeviceState();
  
  return (
    <div className={surveyStepContainer}>
				<Controller
					name='step2.birthDate'
					control={control}
					render={({field}) =>
					<>
						{isMobileDevice
							? <MobileDatePicker
								value={formatDate(field.value, 'onlyDateDot')}
								onChange={(date) => field.onChange(date)}
								label='생년월일'
								isRequired
							/>
							: <CustomDatePicker
								name='birthday'
								value={formatDate(field.value, 'onlyDateDot')}
								onChange={(date) => {
									console.log(date)
									field.onChange(date)
								}}
							/>
						}
					</>
					}
				/>
    </div>
  );
}
