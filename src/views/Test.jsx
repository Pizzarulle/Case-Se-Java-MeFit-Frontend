
import withAuth from "../components/security/withAuth";

const Test = () => {
    return (
        <div>
            <h1>Hello this is the test page</h1>
        </div>
    );
}

export default withAuth(Test);