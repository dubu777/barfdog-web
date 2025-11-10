import AiObesityCheck from "@/components/pages/heathNote/aiObesityCheck/AiObesityCheck";

interface AiObesityCheckPageProps {
	params: Promise<{
		petId: string;
	}>;
}

export default async function AiObesityCheckPage({ params }: AiObesityCheckPageProps) {
	const { petId } = await params;

	return (
		<AiObesityCheck petId={Number(petId)} />
	);
}