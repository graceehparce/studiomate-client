import React, { useEffect } from "react"
import { getMyStudent } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const StudentProfile = () => {
    const [student, setStudent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getMyStudent().then(data => setStudent(data[0]))
    }, [])



    return (
        <article className="studentProfile">
            <section key={`student--${student.id}`} className="student">
                <img className="teacher_img" src={student.img} alt=""></img>
                <div className="student_name">{student.full_name}</div>
                <div className="student_phone">Phone: {student.phone_number}</div>
                <div className="student_email">Email: {student.email}</div>
                <button className="edit_profile"
                    onClick={() => {
                        navigate({ pathname: `/studentProfileEdit/${student.id}` })
                    }}>Edit Profile</button>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/assignments/${student.id}`}>Assignments</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/invoices/${student.id}`}>Invoices</Link>
                </li>

            </section>
        </article>
    )
}