import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAssignments } from "../managers/AssignmentManager"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"

export const AssignmentList = () => {
    const [assignments, setAssignments] = useState([])
    const [student, setStudent] = useState({})

    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAssignments(studentId).then(data => setAssignments(data))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])





    return (
        <article>
            <h1>{student.full_name}'s assignments:</h1>
            <img className="student_img" src={student.img} alt=""></img>
            {
                assignments.map(assignment => {
                    return <section key={`assignment--${assignment.id}`} className="assignment">
                        <Link className="assignment_profile" to={`/assignment/${assignment.id}`}>Assignments {assignment.date_created}</Link>
                    </section>
                })
            }
            <button className="new_assignment"
                onClick={() => {
                    navigate({ pathname: `/assignmentForm/${studentId}` })
                }}>Create New Assignment</button>
        </article>
    )
}