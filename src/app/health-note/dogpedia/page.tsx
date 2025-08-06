import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/loader/Loader";
import Dogpedia from "@/components/pages/heathNote/dogpedia/Dogpedia";
import { prefetchGetBreedList } from "@/api/healthNote/dogpidea/queries/prefetchGetBreedList";

export default async function DogPediaPage() {
	const queryClient = new QueryClient();
	await prefetchGetBreedList(queryClient);
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ErrorBoundary fallback={<div>Something went wrong.</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<Dogpedia />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}