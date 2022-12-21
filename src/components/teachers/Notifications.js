import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"

export const NotificationsList = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [notifications, setNotifications] = useState([])
    const [student, setStudent] = useState([])
    const { studentId } = useParams()

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])


    const getNotifications = () => {
        return fetch(`http://localhost:8000/notifications`, {
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`
            }
        })
            .then(response => response.json())
    }

    useEffect(() => {
        getNotifications().then(data => setNotifications(data))
    }, [])

    const deleteNotification = (notificationId) => {
        return fetch(`http://localhost:8000/notifications/${notificationId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Token ${SMTokenObject.token}`
            }
        })
    }

    return (
        <article>

            {
                notifications.map(notification => {
                    if (notification?.notification_type?.id === 4) {
                        if (SMTokenObject.is_staff === false) {
                            return <div><Link key={`notification--${notification.id}`} className="requests" to={`/lessons/${student.id}`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</button>
                            </div>
                        }
                        else {
                            return <div><Link key={`notification--${notification.id}`} className="requests" to={`/lessons`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</button>
                            </div>
                        }
                    }
                    else if (notification?.notification_type?.id === 2) {
                        return <div><Link key={`notification--${notification.id}`} className="invoices" to={`/invoices/${student.id}`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()

                                    deleteNotification(notification.id)
                                        .then(() => window.location.reload())
                                }}
                                className="btn btn-primary">Seen</button>
                        </div>
                    }
                    else if (notification?.notification_type?.id === 3) {
                        return <div><Link key={`notification--${notification.id}`} className="assignments" to={`/assignments/${student.id}`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()

                                    deleteNotification(notification.id)
                                        .then(() => window.location.reload())
                                }}
                                className="btn btn-primary">Seen</button>
                        </div>
                    }
                    else if (notification?.notification_type?.id === 1) {
                        if (SMTokenObject.is_staff === false) {
                            return <div><Link key={`notification--${notification.id}`} className="messages" to={`/studentMessages/${student?.teacher?.id}`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</button>
                            </div>
                        }
                        else {
                            return <div><Link key={`notification--${notification.id}`} className="messages" to={`/students`}>You have a {notification?.notification_type?.type} from {notification?.sender?.first_name}</Link>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</button>
                            </div>
                        }
                    }

                })
            }
        </article>
    )
}