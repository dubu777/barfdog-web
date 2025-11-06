import ProbiomePickup from "@/components/pages/heathNote/probiome/pickup/ProbiomePickup";

interface ProbiomePickupPageProps {
  params: Promise<{
    diagnosisId: string;
    petId: string;
  }>;
}

export default async function ProbiomePickupPage({
  params,
}: ProbiomePickupPageProps) {
  const { diagnosisId, petId } = await params;
  const rawDiagnosisId = parseInt(diagnosisId);
  const rawPetId = parseInt(petId);
  return <ProbiomePickup diagnosisId={rawDiagnosisId} petId={rawPetId} />;
}
