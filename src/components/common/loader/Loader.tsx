import * as styles from './Loader.css';

interface LoaderProps {
	fullscreen?: boolean;
}

const Loader = ({ fullscreen = false }: LoaderProps) => {
	return (
		fullscreen
			? (
				<div className={styles.loaderContainer}>
					<span className={styles.loader} />
				</div>
			)
			: <span className={styles.loader} />
	);
};

export default Loader;