import React, { useEffect } from "react"
import { getStudent } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const StudentProfile = () => {
    const [student, setStudent] = useState([])
    const navigate = useNavigate()
    const { studentId } = useParams

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])



    return (
        <article className="studentProfile">
            <section key={`student--${student.id}`} className="student">
                <div className="student_img">{student.img}</div>
                <div className="student_name">{student.fullName}</div>
                <div className="student_phone">Phone: {student.phoneNumber}</div>
                <div className="student_email">Email: {student.email}</div>
                <button className="edit__game"
                    onClick={() => {
                        navigate({ pathname: `/students/${student.id}/edit` })
                    }}>Edit Profile</button>
            </section>
        </article>
    )
}