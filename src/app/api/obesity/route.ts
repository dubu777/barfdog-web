import axios from "axios";
import { NextRequest } from "next/server";
import { LIFET_PASSWORD, LIFET_USERNAME } from "@/constants/sVoucher";

const token = Buffer.from(`${LIFET_USERNAME}:${LIFET_PASSWORD}`).toString('base64');

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const surveyId = searchParams.get('surveyId');

	if (!surveyId) {
		return new Response(JSON.stringify({ message: 'surveyId is required' }), {
			status: 400,
		});
	}

	try {
		const { data } = await axios.get(
			`https://lifetdev.co.kr/Interface/Obesity/Result?surveyId=${surveyId}`,
			{
				headers: {
					Authorization: `Basic ${token}`,
				},
			}
		);

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Proxy error', error);
		return new Response(JSON.stringify({ message: 'Failed to fetch obesity result' }), {
			status: 500,
		});
	}
}