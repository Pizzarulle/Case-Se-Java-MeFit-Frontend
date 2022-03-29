import styles from "./Loader.module.css";

/**
 * Help component to render a loading spinner to indicate to user the page is loading
 * @returns
 */
const Loader = () => {
    return (
        <div className={ styles.loaderContainer }>
            <div id={ styles.loader }></div>
        </div>
    );
}

export default Loader;
