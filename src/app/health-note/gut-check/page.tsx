import GutCheckList from "@/components/pages/heathNote/gutCheck/list/GutCheckList";

interface GutCheckListPageProps {
  searchParams: Promise<{
    dogId: string;
  }>;
}

export default async function GutCheckListPage({
  searchParams,
}: GutCheckListPageProps) {
  const { dogId } = await searchParams;
  const parsedDogId = parseInt(dogId);

  return <GutCheckList dogId={parsedDogId} />;
}
