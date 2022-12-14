import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { getStudentLessons } from "../managers/RequestManager"
import { createRequest } from "../managers/RequestManager"

export const StudentLessonList = () => {
    const [lessons, setLessons] = useState([])
    const [student, setStudent] = useState({})
    const [showForm, setShowForm] = useState(false)
    const { studentId } = useParams()
    const [newRequest, setNewRequest] = useState({
        student: studentId,
        time: "",
        date: ""
    })

    useEffect(() => {
        getStudentLessons(studentId).then(data => setLessons(data))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])

    const changeRequestState = (domEvent) => {
        const request = Object.assign({}, newRequest)
        request[domEvent.target.name] = domEvent.target.value
        setNewRequest(request)
    }


    return (
        <article>
            <h1>{student.full_name}'s Upcoming Lessons:</h1>
            <img className="student_img" src={student.img} alt=""></img>
            <h2> Accepted Lessons</h2>
            {
                lessons.map(lesson => {
                    if (lesson.accepted === true) {
                        return <div>Lesson on {lesson.date} at {lesson.time}</div>
                    }
                    else {
                        return ""
                    }
                })
            }

            <h2>Not Yet Accepted Lessons</h2>
            {
                lessons.map(lesson => {
                    if (lesson.accepted === false) {
                        return <div>Lesson on {lesson.date} at {lesson.time}</div>
                    }
                    else {
                        return ""
                    }
                })
            }
            <button onClick={() => setShowForm(!showForm)}>Send Lesson Request</button>
            {
                showForm
                    ?
                    <form>
                        <h2>New Lesson Request</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="date">Lesson Date: </label>
                                <input type="date" name="date" required autoFocus className="form-control"
                                    value={newRequest.date}
                                    onChange={changeRequestState}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="time">Lesson Time: </label>
                                <input type="time" name="time" required autoFocus className="form-control"
                                    value={newRequest.time}
                                    onChange={changeRequestState}
                                />
                            </div>
                        </fieldset>
                        <button type="submit"
                            onClick={evt => {
                                evt.preventDefault()

                                const request = {
                                    student: parseInt(studentId),
                                    date: newRequest.date,
                                    time: newRequest.time,
                                }

                                createRequest(request)
                                    .then(() => window.location.reload())
                            }}
                            className="btn btn-primary">Send</button>
                    </form >
                    :
                    ""}
        </article>
    )
}