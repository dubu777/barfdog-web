import {ReactNode, useEffect, useState} from "react";
import {
	tabBarActiveVariants, tabBarContainerAlign,
	tabBarContainerBase,
	tabBarContainerVariants,
	tabBarVariants
} from "@/components/common/tabBar/TabBar.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface Tab {
	label: string;
	value?: string;
	content?: ReactNode;
	onInit?: () => void;
}

interface TabBarProps {
	variant?: keyof typeof tabBarVariants;
	tabs: Tab[];
	defaultIndex?: number;
	hasTabContent?: boolean;
	width?: number;
	justifyContent?: 'center' | 'spaceBetween' | 'flexStart';
	className?: string;
}

export default function TabBar ({
	variant = 'segmentedButton',
	tabs = [],
	defaultIndex = 0,
	hasTabContent = false,
	width,
	justifyContent = 'flexStart',
	className,
}: TabBarProps) {
	const textType = variant === 'text' ? 'label1' : 'headline3';
	const textColor = variant === 'chips' ? 'gray600' : 'gray300';
	const activeTextColor = variant === 'text' ? 'gray900' : 'white';

	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	useEffect(() => {
		setActiveIndex(defaultIndex);
	}, [defaultIndex]);

	const handleTabChange = (index: number) => {
		setActiveIndex(index);
		tabs[index]?.onInit?.();
	}
	return (
		<>
			<div className={className || ''}>
				<div className={`${tabBarContainerBase} ${tabBarContainerAlign[justifyContent]} ${tabBarContainerVariants[variant]}`}>
					{tabs.map((tab, index) => (
						<button
							key={index}
							style={{
								width: variant !== 'chips'
									? `calc(100% / ${tabs.length})` : width ? width : 'auto'
							}}
							className={`${tabBarVariants[variant]} ${activeIndex === index ? tabBarActiveVariants[variant] : ''}`}
							onClick={() => handleTabChange(index)}
						>
							<DefaultText
								type={textType}
								align='center'
								color={activeIndex === index ? activeTextColor : textColor}
							>
								{tab.label}
							</DefaultText>
						</button>
					))}
				</div>
			</div>
			{hasTabContent && tabs[activeIndex]?.content}
		</>
	);
};