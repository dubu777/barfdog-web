import ProbiomeDetail from "@/components/pages/heathNote/probiome/detail/ProbiomeDetail";

interface ProbiomeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProbiomeDetailPage({
  params,
}: ProbiomeDetailPageProps) {
  const { id } = await params;
  const diagnosisId = parseInt(id, 10);

  return <ProbiomeDetail diagnosisId={diagnosisId} />;
}
