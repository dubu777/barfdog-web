interface HeaderConfigs {
	centerTitle?: string;
	leftTitle?: string;
	showCloseButton?: boolean;
	showBackButton?: boolean;
	showCartButton?: boolean;
	onClose?: () => void;
	onBack?: () => void
}

type dynamicHeaderConfigs = Record<string, (params: Record<string, string>, searchParams: URLSearchParams) => HeaderConfigs>

interface GetHeaderProps {
	pathname: string;
	params: Record<string, string>;
	searchParams: URLSearchParams;
	headerConfigs: Record<string, HeaderConfigs>;
	dynamicHeaderConfigs: dynamicHeaderConfigs
}

export const getHeaderProps = ({ pathname, headerConfigs, dynamicHeaderConfigs, params, searchParams }: GetHeaderProps) => {
	if (headerConfigs[pathname]) return headerConfigs[pathname];

	for (const key in dynamicHeaderConfigs) {
		if (pathname.includes(key)) {
			return dynamicHeaderConfigs[key](params, searchParams);
		}
	}

	return { centerTitle: '' };
}