import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createAssignment } from "../managers/AssignmentManager"


export const AssignmentForm = () => {

    const { studentId } = useParams()
    const navigate = useNavigate()

    const [currentAssignment, setCurrentAssignment] = useState({
        student: studentId,
        fundamentals: "",
        repertoire: "",
        date_created: "",
        comments: ""
    })


    const changeAssignmentState = (domEvent) => {
        const newAssignment = Object.assign({}, currentAssignment)
        newAssignment[domEvent.target.name] = domEvent.target.value
        setCurrentAssignment(newAssignment)
    }

    return (
        <form className="assignmentForm">
            <h2 className="assignmentForm_title">Create New Assignment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date_created">Date: </label>
                    <input type="date" name="date_created" required autoFocus className="form-control"
                        value={currentAssignment.date_created}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fundamentals">Fundamentals: </label>
                    <input type="fundamentals" name="fundamentals" required autoFocus className="form-control"
                        value={currentAssignment.fundamentals}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="repertoire">Repertoire: </label>
                    <input type="text" name="repertoire" required autoFocus className="form-control"
                        value={currentAssignment.repertoire}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comments">Comments: </label>
                    <input type="text" name="comments" required autoFocus className="form-control"
                        value={currentAssignment.comments}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const assignment = {
                        date_created: currentAssignment.date_created,
                        student: studentId,
                        fundamentals: currentAssignment.fundamentals,
                        repertoire: currentAssignment.repertoire,
                        comments: currentAssignment.comments
                    }

                    createAssignment(assignment)
                        .then(() => navigate(`/assignments/${studentId}`))
                }}
                className="btn btn-primary">Create</button>
        </form >
    )
}