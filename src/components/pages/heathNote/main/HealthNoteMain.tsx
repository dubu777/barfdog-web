'"use client";';

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import HealthNoteUser from "./healthNoteUser/healthNoteUser";
import { ErrorBoundary } from "react-error-boundary";

interface HealthNoteMainProps {
  dehydratedState: DehydratedState;
}

const HealthNoteMain = ({ dehydratedState }: HealthNoteMainProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <HealthNoteUser />
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default HealthNoteMain;
