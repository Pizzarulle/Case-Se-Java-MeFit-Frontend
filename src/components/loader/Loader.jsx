import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={ styles.loaderContainer }>
            <div id={ styles.loader }></div>
        </div>
    );
}

export default Loader;
