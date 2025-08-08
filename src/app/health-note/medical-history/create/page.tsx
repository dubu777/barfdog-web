import CreateHistory from "@/components/pages/heathNote/medicalHistory/create/CreateHistory";

interface CreateHistoryPageProps {
	searchParams: Promise<{
		petId: string;
	}>;
}

export default async function CreateHistoryPage({ searchParams }: CreateHistoryPageProps) {
	const { petId } = await searchParams;
	return (
		<CreateHistory petId={Number(petId)} />
	);
}
