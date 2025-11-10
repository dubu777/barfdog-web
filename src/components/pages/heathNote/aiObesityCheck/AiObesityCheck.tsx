import Survey from "./survey/Survey";

export default function AiObesityCheck({ petId }: { petId: number }) {
  return (
    <Survey petId={petId} />
  );
}