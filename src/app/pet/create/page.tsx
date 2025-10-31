import PetCreateForm from "@/components/pages/pet/create/PetCreateForm";

interface PetCreatePageProps {
  searchParams: {
    source: "diet-analysis" | "health-note";
  };
}

export default function PetCreatePage({ searchParams }: PetCreatePageProps) {
  const source = searchParams?.source ?? "diet-analysis";
  return <PetCreateForm source={source} />;
}
