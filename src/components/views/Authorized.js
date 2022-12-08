import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("sm_token")) {
        return children
    }
    else {
        return <Navigate
            to={`/login`}
            replace
            state={{ location }} />
    }
}