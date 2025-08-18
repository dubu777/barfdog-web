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

interface GetDynamicHeaderProps {
	pathname: string;
	dynamicHeaderConfigs: dynamicHeaderConfigs
	params: Record<string, string>;
	searchParams: URLSearchParams;
}

interface GetHeaderProps extends GetDynamicHeaderProps {
	headerConfigs: Record<string, HeaderConfigs>;
}

function getDynamicHeader({ dynamicHeaderConfigs, pathname, params, searchParams }: GetDynamicHeaderProps) {
	for (const key in dynamicHeaderConfigs) {
		if (pathname.includes(key)) {
			return dynamicHeaderConfigs[key](params, searchParams);
		}
	}
}

export const getHeaderProps = ({ pathname, headerConfigs, dynamicHeaderConfigs, params, searchParams }: GetHeaderProps) => {
	// /health-note/pets 와 같은 일반적인 pathname 으로 적용되어 있을 경우
	if (headerConfigs[pathname]) return headerConfigs[pathname];

	// /health-note/{petId}/category 구조일 경우
	const pathParts = pathname.split("/");
	if (pathParts.length > 3 && pathParts[1] === "health-note") {
		const categoryPath = pathParts.slice(3).join("/"); // petId 이후 경로만 추출
		if (headerConfigs[categoryPath]) return headerConfigs[categoryPath];
	}

	const dynamicConfig = getDynamicHeader({
		pathname,
		dynamicHeaderConfigs,
		params,
		searchParams,
	});

	if (dynamicConfig) return dynamicConfig;

	return { centerTitle: '' };
}