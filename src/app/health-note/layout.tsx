import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import HealthNoteHeader from "@/components/pages/heathNote/layout/header/HealthNoteHeader";

interface DefaultLayoutProps {
	children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
	return (
		<>
			<HealthNoteHeader />
			<Wrapper>
				{children}
			</Wrapper>
		</>
	);
}
