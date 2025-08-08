import { DIAGNOSIS_ITEM } from "@/constants";
import { UploadedFile } from "@/types";

type DiagnosisItem = keyof typeof DIAGNOSIS_ITEM;

interface FileChangeInfo {
	addFileIdList: number[];
	deleteFileIdList: number[];
}

interface MedicalHistoryFormValue {
	petId: number;
	hospitalName: string;
	diagnosisDate: string;
	diagnosisItemList: DiagnosisItem[];
	note: string;
	fileChangeInfo: FileChangeInfo;
}

interface MedicalHistoryData {
	diagnosisId: number;
	petName: string;
	hospitalName: string;
	diagnosisDate: string;
	note: string;
	diagnosisItemList: DiagnosisItem[];
}

interface DiagnosisFileList extends UploadedFile {
	diagnosisId: number;
}

interface MedicalHistoryDetail {
	diagnosisInfo: MedicalHistoryData;
	diagnosisFileList: DiagnosisFileList[];
}

interface CreateMedicalHistoryResponse { 
	diagnosisId: number;
	fileChangeInfo: {
		addFileIdList: DiagnosisFileList[];
		deleteFileIdList: DiagnosisFileList[];
	}
}

export type {
	DiagnosisItem,
	MedicalHistoryFormValue,
	MedicalHistoryData,
	MedicalHistoryDetail,
	DiagnosisFileList,
	CreateMedicalHistoryResponse,
}