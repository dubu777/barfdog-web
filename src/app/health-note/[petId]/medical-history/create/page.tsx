import CreateHistory from "@/components/pages/heathNote/medicalHistory/create/CreateHistory";

interface CreateHistoryPageProps {
	params: Promise<{
		petId: string;
	}>;
}

export default async function CreateHistoryPage({ params }: CreateHistoryPageProps) {
	const { petId } = await params;
	return (
		<CreateHistory petId={Number(petId)} />
	);
}
