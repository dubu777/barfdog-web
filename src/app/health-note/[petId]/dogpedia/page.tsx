import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner/Spinner";
import Dogpedia from "@/components/pages/heathNote/dogpedia/Dogpedia";
import { prefetchGetBreedList } from "@/api/healthNote/dogpidea/queries/prefetchGetBreedList";
import { prefetchGetPetDetail } from "@/api/pet/queries/prefetchGetPetDetail";

interface DogPediaPageProps {
	params: Promise<{
		petId: string;
	}>;
}

export default async function DogPediaPage({ params }: DogPediaPageProps) {
	const { petId } = await params;
	const queryClient = new QueryClient();
	await prefetchGetBreedList(queryClient);
	await prefetchGetPetDetail(queryClient, Number(petId));
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ErrorBoundary fallback={<div>Something went wrong.</div>}>
				<Suspense fallback={<Spinner fullscreen />}>
					<Dogpedia petId={Number(petId)} />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}