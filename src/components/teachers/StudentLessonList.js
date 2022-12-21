import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { getStudentLessons } from "../managers/RequestManager"
import { createRequest } from "../managers/RequestManager"
import { deleteRequest } from "../managers/RequestManager"

export const StudentLessonList = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [lessons, setLessons] = useState([])
    const [student, setStudent] = useState({})
    const [showForm, setShowForm] = useState(false)
    const { studentId } = useParams()
    const [newRequest, setNewRequest] = useState({
        student: studentId,
        time: "",
        date: ""
    })
    const notification = {
        notification_type: 4
    }

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

    const updateRequest = (request) => {
        return fetch(`http://localhost:8000/requests/${request.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
    }
    const createRequestNotificationFromTeacher = (notification) => {
        return fetch(`http://localhost:8000/notifications?student=${studentId}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notification)
        })
    }

    const createRequestNotificationFromStudent = (notification) => {
        return fetch(`http://localhost:8000/notifications?teacher=${student.teacher.id}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notification)
        })
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

                        if (SMTokenObject.is_staff === true) {

                            return <div>Lesson on {lesson.date} at {lesson.time}</div>
                        }
                        else {
                            return <div>
                                <div>Lesson on {lesson.date} at {lesson.time}</div>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        const acceptedRequest = {
                                            id: lesson.id,
                                            accepted: true
                                        }

                                        updateRequest(acceptedRequest)
                                            .then(() => createRequestNotificationFromStudent(notification))
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Accept</button>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteRequest(lesson.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Decline</button>
                            </div>
                        }
                    }
                    else {
                        return ""
                    }
                })
            }

            {
                SMTokenObject.is_staff === true
                    ?

                    <button onClick={() => setShowForm(!showForm)}>Send Lesson Request</button>

                    :
                    ""

            }
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
                                    .then(() => createRequestNotificationFromTeacher(notification))
                                    .then(() => window.location.reload())
                            }}
                            className="btn btn-primary">Send</button>
                    </form >
                    :
                    ""}
        </article>
    )
}