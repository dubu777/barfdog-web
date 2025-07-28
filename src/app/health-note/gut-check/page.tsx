import GutCheckList from "@/components/pages/heathNote/gutCheck/list/GutCheckList";

interface GutCheckListPageProps {
  searchParams: {
    dogId: string;
  };
}

export default function GutCheckListPage({
  searchParams,
}: GutCheckListPageProps) {
  const dogId = parseInt(searchParams.dogId);

  return <GutCheckList dogId={dogId} />;
}
