import styles from "./User.module.css";

const User = ({ userData }) => {
    const { firstName, lastName, isContributor, isAdmin } = userData;

    return (
        <div>
            <h1>{ firstName } { lastName }</h1>
            <div className={ styles.userContainer } id={ isAdmin ? styles.isAdmin : isContributor ? styles.isContributor : "" }>
                <div className={ styles.row }>
                    <div className={ styles.column }>
                        <p>Status:</p>
                        <div className={ styles.floatRight }>
                            <p className={ styles.admin }>Admin: <b>{ isAdmin.toString() }</b></p>
                            <p className={ styles.contributor }>Contributor: <b>{ isContributor.toString() }</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
