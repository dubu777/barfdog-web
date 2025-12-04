import axios from 'axios';
import { NextRequest } from 'next/server';
import { LIFET_PASSWORD, LIFET_USERNAME } from '@/constants/healthNote/aiObesityCheck';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();

		const file = formData.get('file') as File | null;
		const weight = formData.get('weight') as string | null;

		if (!file || !weight) {
			return new Response(JSON.stringify({ message: 'file and weight are required' }), { status: 400 });
		}

		const blob = new Blob([await file.arrayBuffer()], { type: file.type });
		const uploadForm = new FormData();
		uploadForm.append('file', blob, file.name);
		uploadForm.append('weight', weight);

		const token = Buffer.from(`${LIFET_USERNAME}:${LIFET_PASSWORD}`).toString('base64');

		const { data } = await axios.post(
			'https://lifetdev.co.kr/Interface/Obesity/New',
			uploadForm,
			{
				headers: {
					Authorization: `Basic ${token}`,
					// axios가 자동으로 boundary 설정해주기 때문에 Content-Type은 생략
				},
			}
		);

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.error('Upload proxy error:', error);
		return new Response(JSON.stringify({ message: 'Upload failed' }), { status: 500 });
	}
}
