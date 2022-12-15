import React, { useEffect } from "react"
import { useState } from "react"
import { getMyTeacher } from "../managers/TeacherManager"
import { Link, useParams } from "react-router-dom"

export const StudentsTeacherProfile = () => {
    const [teacher, setTeacher] = useState({})
    const { studentId } = useParams()

    useEffect(() => {
        getMyTeacher(studentId).then(data => setTeacher(data[0]))
    }, [])



    return (
        <article className="teacherProfile">
            <section key={`teacher--${teacher.id}`} className="teacher">
                <img className="teacher_img" src={teacher.img} alt=""></img>
                <div className="teacher_name">{teacher.full_name}</div>
                <div className="teacher_phone">Phone: {teacher.phone_number}</div>
                <div className="teacher_email">Email: {teacher.email}</div>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/resources/${teacher.id}`}>Resources</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to={`/studentMessages/${teacher.id}`}>Messages</Link>
                </li>
            </section>
        </article>
    )
}