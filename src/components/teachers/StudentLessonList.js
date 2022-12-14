import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { getStudentLessons } from "../managers/RequestManager"
import { createRequest } from "../managers/RequestManager"
import { deleteRequest } from "../managers/RequestManager"
import { Avatar, Button, Card, Image } from "@mantine/core"
import { Link } from "react-router-dom"
import "./StudentLessonList.css"
import { DatePicker, TimeInput } from "@mantine/dates"


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
        getStudent(studentId)
            .then(data => setStudent(data))
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

    const formatDate = (project) => {
        let formattedDate = project.split("T")
        formattedDate = formattedDate[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2], formattedDate[0]]
        return formattedDate.join("/")
    }
    const formatTime = (project) => {
        let formattedTime = project.split(':')
        formattedTime = [formattedTime[0], formattedTime[1]]
        return formattedTime.join(":")
    }


    return (
        <div className="insteadOfNav" style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div className="headBox">
                        {
                            SMTokenObject.is_staff === true
                                ?
                                <Link to={`/students/${student.id}`}>
                                    <Avatar
                                        radius={100}
                                        height={80}
                                        width="auto"
                                        src={student.img}
                                        alt="Student"
                                        fit="contain"
                                    />
                                </Link>
                                :
                                <Link to={`/myStudentProfile`}>
                                    <Image
                                        radius={100}
                                        height={100}
                                        width="auto"
                                        src={student.img}
                                        alt="Student"
                                        fit="contain"
                                    />
                                </Link>
                        }
                        <h2>{student.full_name}'s Upcoming Lessons:</h2>
                    </div>
                </Card.Section>
                <Card.Section className="bodySection">
                    <h3> Accepted Lessons</h3>
                    {
                        lessons.map(lesson => {
                            if (lesson.accepted === true) {
                                const date = formatDate(lesson.date)
                                const time = formatTime(lesson.time)
                                return <div className="listLessons">Lesson on {date} at {time}</div>
                            }
                            else {
                                return ""
                            }
                        })
                    }

                    <h3>Not Yet Accepted Lessons</h3>
                    {
                        lessons.map(lesson => {
                            if (lesson.accepted === false) {

                                if (SMTokenObject.is_staff === true) {
                                    const date = formatDate(lesson.date)
                                    const time = formatTime(lesson.time)
                                    return <div className="listLessons">Lesson on {date} at {time}</div>
                                }
                                else {
                                    const date = formatDate(lesson.date)
                                    const time = formatTime(lesson.time)
                                    return <div className="decideBox">
                                        <div>Lesson on {date} at {time}</div>
                                        <div className="twoButtons">
                                            <Button className="decideButton"
                                                variant="light"
                                                color="orangy"
                                                radius={20}
                                                type="submit"
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
                                            >Accept</Button>
                                            <Button
                                                className="decideButton"
                                                variant="dark"
                                                color="orangy"
                                                radius={20} type="submit"
                                                onClick={evt => {
                                                    evt.preventDefault()

                                                    deleteRequest(lesson.id)
                                                        .then(() => window.location.reload())
                                                }}
                                            >Decline</Button>
                                        </div>
                                    </div>
                                }
                            }
                            else {
                                return ""
                            }
                        })
                    }
                    <div className="buttonBox">

                        {
                            SMTokenObject.is_staff === true
                                ?

                                <Button
                                    className="formButton"
                                    variant="light"
                                    color="orangy"
                                    radius={20}
                                    type="submit" onClick={() => setShowForm(!showForm)}>Send Lesson Request</Button>

                                :
                                ""

                        }
                    </div>
                </Card.Section>
                <div className="centerForm">
                    {
                        showForm
                            ?
                            <div className="formSection">
                                <h3>New Lesson Request</h3>
                                <div className="datePicker">
                                    <label className="dateLabel">Lesson Date:</label>
                                    <input size="sm" placeholder="pick a date" label="Lesson Date:" name="date" type="date"
                                        value={newRequest.date}
                                        onChange={changeRequestState}
                                    />
                                </div>
                                <div className="datePicker">
                                    <label className="dateLabel">Lesson Time: </label>
                                    <input label="Lesson Time:" type="time" name="time" required autoFocus className="form-control"
                                        value={newRequest.time}
                                        onChange={changeRequestState}
                                    />
                                </div>
                                <Button variant="light"
                                    color="orangy"
                                    radius={20}
                                    type="submit"
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
                                    className="lessonSubmit">Submit</Button>
                            </div >
                            :
                            ""}
                </div>
            </Card>
        </div >
    )
}