import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const StudentNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            {
                localStorage.getItem("sm_token")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("sm_token")
                            debugger
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}