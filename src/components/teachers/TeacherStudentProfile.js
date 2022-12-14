import React, { useEffect } from "react"
import { getStudent } from "../managers/StudentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const TeacherStudentProfile = () => {
    const [student, setStudent] = useState([])
    const { studentId } = useParams()

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])



    return (
        <article className="studentProfile">
            <section key={`student--${student.id}`} className="student">
                <img className="student_ing" src={student.img} alt=""></img>
                <div className="student_name">{student.full_name}</div>
                <div className="student_phone">Phone: {student.phone_number}</div>
                <div className="student_email">Email: {student.email}</div>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/assignments/${student.id}`}>Assignments</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/invoices/${student.id}`}>Invoices</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/messages/${student.id}`}>Messages</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/lessons/${student.id}`}>Schedule</Link>
                </li>
            </section>
        </article>
    )
}