import * as styles from "@/components/common/multiFileUpload/MultiFileUpload.css";
import { ChangeEvent, useRef } from "react";
import UploadLabel from "/public/images/icons/upload-label.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ImageCarousel from "@/components/common/imageCarousel/ImageCarousel";
import { UploadedFile } from "@/types";

interface MultiFileUploaderProps {
	files: UploadedFile[];
	onUpload: (file: File) => void;
	onRemove: (fileId: number) => void;
	maxFiles?: number;
	errors?: string[];
	title?: string;
	className?: string;
	width?: number;
	height?: number;
	showRepresentativeLabel?: boolean;
}

// UploadedFile type 형식의 파일 업로더
export default function MultiFileUploader({
	files,
	onUpload,
	onRemove,
	maxFiles = 10,
	errors,
	title,
	className,
	width = 100,
	height = 100,
	showRepresentativeLabel = false,
}: MultiFileUploaderProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;
		if (!fileList) return;

		const filesArray = Array.from(fileList);
		const allowed = maxFiles - files.length;

		filesArray.slice(0, allowed).forEach(onUpload);
		e.target.value = '';
	};

	return (
		<div className={className ?? ''}>
			<div className={styles.fileUploadTitle}>
				{title && <DefaultText type="label4">{title}</DefaultText>}
			</div>
			<div>
				<div className={styles.uploadBox}>
					<button
						onClick={(e) => {
							e.preventDefault();
							fileInputRef.current?.click()
						}}
						disabled={files.length >= maxFiles}
						className={styles.uploadLabel}
					>
						<SvgIcon src={UploadLabel} size={24} />
					</button>
					<input
						type="file"
						ref={fileInputRef}
						hidden
						accept="image/*"
						multiple
						onChange={handleFileChange}
					/>
					{files.length > 0 && (
						<div style={{ width: "calc(100% - 104px)" }}>
							<ImageCarousel
								width={width}
								height={height}
								imageList={files}
								handleRemoveFile={onRemove}
								showRepresentativeLabel={showRepresentativeLabel}
							/>
						</div>
					)}
				</div>
				<div className={styles.uploadInfo}>
					{errors && errors?.length > 0 && (
						<div className={styles.error}>
							{errors?.map((error) => (
								<DefaultText key={error} type="caption" color="red">
									{error}
								</DefaultText>
							))}
						</div>
					)}
					<DefaultText type="caption" color="gray500">
						• 파일은 최대 10장 이내로 등록 가능합니다.
						<br />• 파일크기는 10MB이하 / jpg, jpeg, png, gif 형식만 등록
						가능합니다.
					</DefaultText>
				</div>
			</div>
		</div>
	);
};
