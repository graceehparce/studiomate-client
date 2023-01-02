import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { Card, Button, Image } from "@mantine/core"
import "./Notifications.css"
import { IconCalendar, IconFileDollar, IconPencil, IconMessages, IconBellRinging } from "@tabler/icons"


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
        <div style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <div className="notHeading">
                    <IconBellRinging />
                    <h2>Notifications</h2>
                </div>
                {
                    notifications.map(notification => {
                        if (notification?.notification_type?.id === 4) {
                            if (SMTokenObject.is_staff === false) {
                                return <div className="notSection">
                                    <Link key={`notification--${notification.id}`} className="notText" to={`/lessons/${student.id}`}>
                                        <IconCalendar />
                                        You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}
                                    </Link>
                                    <Button
                                        variant="light"
                                        color="orangy"
                                        radius={20}
                                        type="submit"
                                        onClick={evt => {
                                            evt.preventDefault()

                                            deleteNotification(notification.id)
                                                .then(() => window.location.reload())
                                        }}
                                        className="btn btn-primary">Seen</Button>
                                </div>
                            }
                            else {
                                return <div className="notSection">
                                    <Link key={`notification--${notification.id}`} className="notText" to={`/lessons`}>
                                        <IconCalendar />
                                        You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}
                                    </Link>
                                    <Button
                                        variant="light"
                                        color="orangy"
                                        radius={20}
                                        type="submit"
                                        onClick={evt => {
                                            evt.preventDefault()

                                            deleteNotification(notification.id)
                                                .then(() => window.location.reload())
                                        }}
                                        className="btn btn-primary">Seen</Button>
                                </div>
                            }
                        }
                        else if (notification?.notification_type?.id === 2) {
                            return <div className="notSection">
                                <Link key={`notification--${notification.id}`} className="notText" to={`/invoices/${student.id}`}>
                                    <IconFileDollar />
                                    You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}
                                </Link>
                                <Button
                                    variant="light"
                                    color="orangy"
                                    radius={20}
                                    type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</Button>
                            </div>
                        }
                        else if (notification?.notification_type?.id === 3) {
                            return <div className="notSection">
                                <Link key={`notification--${notification.id}`} className="notText" to={`/assignments/${student.id}`}>
                                    <IconPencil />
                                    You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}</Link>
                                <Button
                                    variant="light"
                                    color="orangy"
                                    radius={20}
                                    type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        deleteNotification(notification.id)
                                            .then(() => window.location.reload())
                                    }}
                                    className="btn btn-primary">Seen</Button>
                            </div>
                        }
                        else if (notification?.notification_type?.id === 1) {
                            if (SMTokenObject.is_staff === false) {
                                return <div className="notSection">
                                    <Link key={`notification--${notification.id}`} className="notText" to={`/studentMessages/${student?.teacher?.id}`}>
                                        <IconMessages />
                                        You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}</Link>
                                    <Button
                                        variant="light"
                                        color="orangy"
                                        radius={20}
                                        type="submit"
                                        onClick={evt => {
                                            evt.preventDefault()

                                            deleteNotification(notification.id)
                                                .then(() => window.location.reload())
                                        }}
                                        className="btn btn-primary">Seen</Button>
                                </div>
                            }
                            else {
                                return <div className="notSection">
                                    <Link key={`notification--${notification.id}`} className="notText" to={`/students`}>
                                        <IconMessages />
                                        You have a {notification?.notification_type?.type} notification from {notification?.sender?.first_name}</Link>
                                    <Button
                                        variant="light"
                                        color="orangy"
                                        radius={20}
                                        type="submit"
                                        onClick={evt => {
                                            evt.preventDefault()

                                            deleteNotification(notification.id)
                                                .then(() => window.location.reload())
                                        }}
                                        className="btn btn-primary">Seen</Button>
                                </div>
                            }
                        }

                    })
                }
            </Card>
        </div>
    )
}