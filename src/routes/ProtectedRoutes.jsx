import {Navigate, useLocation} from "react-router-dom";
import isLoggedIn from "../utils/isLoggedIn.js";

export default function ProtectedRoute({children}) {
    const user = isLoggedIn();
    const {pathname} = useLocation();
    if (!user) {
        return <Navigate to="/sign-in" state={{path: pathname}}/>;
    }

    return children;
}
