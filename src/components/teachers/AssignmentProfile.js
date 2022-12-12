import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getAssignment } from "../managers/AssignmentManager"

export const AssignmentProfile = () => {
    const [assignment, setAssignment] = useState([])
    const { assignmentId } = useParams()

    useEffect(() => {
        getAssignment(assignmentId).then(data => setAssignment(data))
    }, [])



    return (
        <article className="assignmentProfile">
            <section key={`assignment--${assignment.id}`} className="assignment">
                <div className="assignment_date">Assignment {assignment.date_created}</div>
                <div className="assignment_fun">Fundamentals: {assignment.fundamentals}</div>
                <div className="assignment_rep">Repertoire: {assignment.repertoire}</div>
                <div className="assignment_comments">Comments: {assignment.comments}</div>
            </section>
        </article>
    )
}