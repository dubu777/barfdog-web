import CreateProbiome from "@/components/pages/heathNote/probiome/create/CreateProbiome";

interface CreateProbiomePageProps {
  params: {
    petId: string;
  };
}

export default async function CreateProbiomePage({ params }: CreateProbiomePageProps) {
  const { petId } = await params;
  return <CreateProbiome petId={Number(petId)} />;
}
