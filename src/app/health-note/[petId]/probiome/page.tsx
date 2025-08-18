import ProbiomeList from "@/components/pages/heathNote/probiome/list/ProbiomeList";
import { redirect } from "next/navigation";

interface ProbiomeListPageProps {
  params: {
    petId: string;
  };
}

export default async function ProbiomeListPage({
  params,
}: ProbiomeListPageProps) {
  const { petId } = params;
  const parsedDogId = parseInt(petId);

  return <ProbiomeList petId={parsedDogId} />;
}
