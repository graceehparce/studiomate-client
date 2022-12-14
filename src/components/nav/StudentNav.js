import { Link, useNavigate } from "react-router-dom"
import { getMyStudent } from "../managers/StudentManager"
import "./NavBar.css"
import { useState } from "react"
import { useEffect } from "react"

export const StudentNav = () => {
    const navigate = useNavigate()
    const [student, setStudent] = useState({})

    useEffect(() => {
        getMyStudent().then(data => setStudent(data[0]))
    }, [])


    return (
        <ul className="navbar">
            {
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/teacher/${student.id}`}>My Teacher</Link>
                </li>
            }
            {
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/myStudentProfile/${student.id}`}>Home</Link>
                </li>
            }
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