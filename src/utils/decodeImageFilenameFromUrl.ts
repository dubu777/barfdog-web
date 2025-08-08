export function decodeImageFilenameFromUrl(imageUrl: string) {
	try {
		const url = new URL(imageUrl);
		const filename = url.searchParams.get('filename');

		if (!filename) return imageUrl;

		// 한 번 디코딩 (일반적인 인코딩 대응)
		const onceDecoded = decodeURIComponent(filename);
		// 이중 인코딩된 경우 대비한 두 번째 디코딩
		const twiceDecoded = decodeURIComponent(onceDecoded);

		// + 기호를 공백으로 변환 (디코딩된 문자열에서 공백으로 인식되도록)
		const finalFilename = twiceDecoded.replace(/\+/g, ' ');

		// 디코딩된 파일명을 다시 URL 파라미터로 설정
		url.searchParams.set('filename', finalFilename);
		return url.toString();
	} catch (e) {
		console.warn('Invalid image URL:', imageUrl, e);
		return imageUrl;
	}
}
