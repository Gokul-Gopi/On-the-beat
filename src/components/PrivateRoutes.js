import { useLocation, Navigate, Route } from "react-router-dom"
import Login from "../pages/Login/Login";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ path, ...props }) => {
    const location = useLocation()
    const { authState, authDispatch } = useAuth()

    return authState.isLoggedIn ? (
        <>
            <Login />
            <Route exact {...props} path={path} />
        </>
    ) : (
        <Navigate state={{ from: location.pathname }} replace to='/login' />
    );

}
export default PrivateRoutes