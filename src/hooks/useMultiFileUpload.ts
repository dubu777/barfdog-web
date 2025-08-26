import { useMemo, useRef, useState } from "react";
import { UploadedFile } from "@/types";
import { uploadAxiosInstance } from "@/api/axiosInstance";
import { postKeepalive } from "@/utils/network/postKeepalive";
import { toAbsoluteUrl } from "@/utils/network/url";

export interface FileChangeInfo {
  addFileIdList: number[];
  deleteFileIdList: number[];
}

interface UseMultiFileUploadOptions {
  fileKey: string;
  initialFiles?: UploadedFile[];
  getExtraFormData?: (file: File) => Record<string, any>;
  uploadApiUrl: string;
  deleteApiUrl?: string;
  cancelApiUrl: string;
  onUploadSuccess?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
  onDeleteSuccess?: (fileId: number) => void;
  onDeleteError?: (error: unknown) => void;
  onCancel?: () => void;
}

export function useMultiFileUpload({
  fileKey = "file",
  initialFiles = [],
  getExtraFormData,
  uploadApiUrl,
  deleteApiUrl,
  cancelApiUrl,
  ...callbacks
}: UseMultiFileUploadOptions) {
  const initialFilesRef = useRef(initialFiles);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    initialFilesRef.current
  );
  const [addFileIdList, setAddFileIdList] = useState<number[]>([]);
  const [deleteFileIdList, setDeleteFileIdList] = useState<number[]>([]);

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append(fileKey, file);

      if (getExtraFormData) {
        const extra = getExtraFormData(file);
        Object.entries(extra).forEach(([key, value]) => {
          // JSON 객체라면 Blob으로 변환
          const isBlob = value instanceof Blob;
          const appendValue = isBlob
            ? value
            : new Blob([JSON.stringify(value)], { type: "application/json" });
          formData.append(key, appendValue);
        });
      }
      const res = await uploadAxiosInstance.post(uploadApiUrl, formData);

      if (!res.data.success) {
        callbacks.onUploadError?.(res.data.message);
        return;
      }

      const uploaded: UploadedFile = res.data.data;

      setUploadedFiles((prev) => [...prev, uploaded]);
      setAddFileIdList((prev) => [...prev, uploaded.fileId]);
      callbacks.onUploadSuccess?.(uploaded);
    } catch (err) {
      callbacks.onUploadError?.(err);
    }
  };

  const removeFile = async (fileId: number) => {
    try {
      // 서버에 삭제 요청
      if (deleteApiUrl) {
        const res = await uploadAxiosInstance.delete(
          `${deleteApiUrl}/${fileId}`
        );
        if (!res.data.success) {
          callbacks.onDeleteError?.(res.data.message);
        }
      }

      // 로컬 상태 갱신
      setUploadedFiles((prev) => prev.filter((file) => file.fileId !== fileId));
      setDeleteFileIdList((prev) => [...prev, fileId]);
      setAddFileIdList((prev) => prev.filter((id) => id !== fileId));

      callbacks.onDeleteSuccess?.(fileId);
    } catch (err) {
      callbacks.onDeleteError?.(err);
    }
  };

  const reset = () => {
    setUploadedFiles([]);
    setAddFileIdList([]);
    setDeleteFileIdList([]);
  };

  const cancelUpload = async (keepalive?: boolean) => {
    try {
      if (keepalive && typeof window !== "undefined") {
        // 언로드 타이밍: keepalive 유틸 사용
        await postKeepalive(toAbsoluteUrl(cancelApiUrl));
      } else {
        // 일반 타이밍: 기존 axios 사용(인터셉터, 에러 핸들링 그대로)
        await uploadAxiosInstance.post(cancelApiUrl);
      }
      reset();
      callbacks.onCancel?.();
    } catch (err) {
      console.error("Upload cancel failed", err);
    }
  };

  const fileChangeInfo: FileChangeInfo = {
    addFileIdList,
    deleteFileIdList,
  };

  const hasPendingUploads = useMemo(
    () => addFileIdList.length > 0 || deleteFileIdList.length > 0,
    [addFileIdList.length, deleteFileIdList.length]
  );

  return {
    uploadedFiles,
    fileChangeInfo,
    uploadFile,
    removeFile,
    reset,
    cancelUpload,
    hasPendingUploads,
  };
}
