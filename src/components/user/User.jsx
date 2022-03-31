import styles from "./User.module.css";

/**
 * Component to render basic info about a user
 * @param {*} param0 
 * @returns 
 */
const User = ({ userData }) => {
    const { firstName, lastName, roles:{isContributor, isAdmin} } = userData;

    return (
        <div>
            <div className={ styles.userContainer } id={ isAdmin ? styles.isAdmin : isContributor ? styles.isContributor : "" }>
            <h1>{ firstName } { lastName }</h1>
                <div className={ styles.row }>
                    <div className={ styles.column }>
                        <p>Status: {isAdmin ?  "Admin" : isContributor ? "Contributor" : "Normal User"}</p>
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
