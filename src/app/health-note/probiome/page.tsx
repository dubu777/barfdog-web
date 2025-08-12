import ProbiomeList from "@/components/pages/heathNote/probiome/list/ProbiomeList";

interface ProbiomeListPageProps {
  searchParams: {
    dogId: string;
  };
}

export default async function ProbiomeListPage({
  searchParams,
}: ProbiomeListPageProps) {
  const { dogId } = searchParams;
  const parsedDogId = parseInt(dogId);

  return <ProbiomeList dogId={parsedDogId} />;
}
