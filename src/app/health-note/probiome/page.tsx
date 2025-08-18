import ProbiomeList from "@/components/pages/heathNote/probiome/list/ProbiomeList";
import { redirect } from "next/navigation";

interface ProbiomeListPageProps {
  searchParams: {
    petId?: string;
  };
}

export default function ProbiomeListPage({
  searchParams,
}: ProbiomeListPageProps) {
  const { petId } = searchParams;
  const parsedPetId = petId ? parseInt(petId) : null;

  if (!parsedPetId) {
    redirect("/health-note");
  }

  return <ProbiomeList petId={parsedPetId} />;
}
