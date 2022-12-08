import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const TeacherNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            {
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/students">Home</Link>
                </li>
            }
            {
                localStorage.getItem("sm_token")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("sm_token")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}