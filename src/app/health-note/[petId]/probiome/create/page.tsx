import CreateProbiome from "@/components/pages/heathNote/probiome/create/CreateProbiome";

interface CreateProbiomePageProps {
  params: {
    petId: string;
  };
}

export default function CreateProbiomePage({
  params,
}: CreateProbiomePageProps) {
  const { petId } = params;
  const parsedPetId = parseInt(petId);
  return <CreateProbiome petId={parsedPetId} />;
}
