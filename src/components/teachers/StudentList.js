import React, { useEffect } from "react"
import { getStudents } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const StudentList = () => {
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])



    return (
        <article>
            <h1>These are your students:</h1>
            {
                students.map(student => {
                    return <section key={`student--${student.id}`} className="student">
                        <img className="student_img" src={student.img} alt=""></img>
                        <div className="student_name">{student.full_name}</div>
                        <div className="student_phone">Phone: {student.phone_number}</div>
                        <div className="student_email">Email: {student.email}</div>
                        <button className="edit__game"
                            onClick={() => {
                                navigate({ pathname: `/students/${student.id}` })
                            }}>View Profile</button>
                    </section>
                })
            }
        </article>
    )
}