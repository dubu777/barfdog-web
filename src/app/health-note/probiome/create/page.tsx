import { redirect } from "next/navigation";
import CreateProbiome from "@/components/pages/heathNote/probiome/create/CreateProbiome";

interface CreateProbiomePageProps {
  searchParams: {
    petId?: string;
  };
}

export default function CreateProbiomePage({
  searchParams,
}: CreateProbiomePageProps) {
  const { petId } = searchParams;
  const parsedPetId = petId ? parseInt(petId) : null;

  if (!parsedPetId) {
    redirect("/health-note");
  }

  return <CreateProbiome petId={parsedPetId} />;
}
