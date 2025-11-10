export const getUploadErrorMessage = (error: unknown): string => {
	if (!(error instanceof Error)) {
		return '업로드에 실패했습니다.';
	}

	const message = error.message.toLowerCase();
	
	if (message.includes('network error')) {
		return '네트워크 연결을 확인해주세요.';
	}
	if (message.includes('timeout')) {
		return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
	}
	if (message.includes('request entity too large') || message.includes('413')) {
		return '10MB 이하의 이미지만 업로드 할 수 있어요';
	}
	
	return error.message || '업로드에 실패했습니다.';
};