import React, { useEffect } from "react"
import { useState } from "react"
import { getTeacher } from "../managers/TeacherManager"
import { useNavigate } from "react-router-dom"

export const TeacherProfile = () => {
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])



    return (
        <article className="teacherProfile">
            <section key={`teacher--${teacher.id}`} className="teacher">
                <img className="teacher_img" src={teacher.img} alt=""></img>
                <div className="teacher_name">{teacher.full_name}</div>
                <div className="teacher_phone">Phone: {teacher.phone_number}</div>
                <div className="teacher_email">Email: {teacher.email}</div>
                <button className="edit__game"
                    onClick={() => {
                        navigate({ pathname: `/editProfileForm/${teacher.id}` })
                    }}>Edit Profile</button>
            </section>
        </article>
    )
}