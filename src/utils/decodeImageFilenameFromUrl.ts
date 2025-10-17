export function decodeImageFilenameFromUrl(imageUrl: string) {
	try {
		// URL에 공백이 포함된 경우 먼저 정리
		// "filename = value" 형태를 "filename=value"로 변환
		const cleanedUrl = imageUrl
			.replace(/\s*=\s*/g, '=')  // "= " 또는 " =" 를 "="로 변환
			.replace(/\s+/g, ' ')      // 연속된 공백을 하나로 변환
			.trim();                   // 앞뒤 공백 제거
		
		
		const url = new URL(cleanedUrl);
		const filename = url.searchParams.get('filename');

		if (!filename) {
			console.warn('No filename parameter found in URL:', imageUrl);
			return imageUrl;
		}

		// 한 번 디코딩 (일반적인 인코딩 대응)
		const onceDecoded = decodeURIComponent(filename);
		// 이중 인코딩된 경우 대비한 두 번째 디코딩
		const twiceDecoded = decodeURIComponent(onceDecoded);

		// + 기호를 공백으로 변환 (디코딩된 문자열에서 공백으로 인식되도록)
		const finalFilename = twiceDecoded.replace(/\+/g, ' ');

		// 디코딩된 파일명을 다시 URL 파라미터로 설정
		url.searchParams.set('filename', finalFilename);
		const result = url.toString();
		
		return result;
	} catch (e) {
		console.warn('Invalid image URL:', imageUrl, e);
		return imageUrl;
	}
}
