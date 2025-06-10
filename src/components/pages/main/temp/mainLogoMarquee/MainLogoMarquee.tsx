import * as styles from './MainLogoMarquee.css';
import Image from "next/image";
import Marquee from "react-fast-marquee";

const logos = [
	'/images/mypage/sample/sample1.jpg',
	'/images/mypage/sample/sample2.jpg',
	'/images/mypage/sample/sample3.jpg',
	'/images/mypage/sample/sample4.jpg',
];

const MainLogoMarquee = () => {
	return (
		<article className={styles.marqueeContainer}>
			<Marquee
				gradient
				gradientWidth={50}
				speed={30}
				pauseOnHover
			>
				<div className={styles.marqueeTrack}>
					{[...logos, ...logos].map((logo, index) => (
						<Image key={index} src={logo} alt={`image-${index}`} width={150} height={150} className={styles.logoItem} />
					))}
				</div>
			</Marquee>
		</article>
	);
};

export default MainLogoMarquee;