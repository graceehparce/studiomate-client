import { Card, Image, Button } from "@mantine/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { getLessons } from "../managers/RequestManager"
import { getTeacher } from "../managers/TeacherManager"
import { Link } from "react-router-dom"
import "./LessonList.css"
import { deleteRequest } from "../managers/RequestManager"



export const LessonsList = () => {
    const [lessons, setLessons] = useState([])
    const [teacher, setTeacher] = useState({})

    useEffect(() => {
        getLessons().then(data => setLessons(data))
    }, [])

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

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
                <div className="lessonPicBox">
                    <Link to={`/teacher`}>
                        <Image
                            radius={100}
                            height={100}
                            width="auto"
                            src={teacher.img}
                            alt="Teacher"
                            fit="contain"
                        />
                    </Link>
                </div>
                <h1>{teacher.full_name}'s Upcoming Lessons</h1>
                {
                    lessons.map(lesson => {
                        if (lesson.accepted === true) {
                            const date = formatDate(lesson.date)
                            const time = formatTime(lesson.time)
                            return <div className="lessonBox">Lesson with {lesson?.student?.full_name} on {date} at {time}
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
                                >Complete</Button></div>
                        }
                        else {
                            return ""
                        }
                    })
                }
            </Card>
        </div>
    )
}