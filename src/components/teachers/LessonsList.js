import { Card, Image } from "@mantine/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { getLessons } from "../managers/RequestManager"
import { getTeacher } from "../managers/TeacherManager"
import { Link } from "react-router-dom"

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
        <div style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
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
                <h1>{teacher.full_name}'s Upcoming Lessons</h1>
                {
                    lessons.map(lesson => {
                        if (lesson.accepted === true) {
                            const date = formatDate(lesson.date)
                            const time = formatTime(lesson.time)
                            return <div>Lesson with {lesson?.student?.full_name} on {date} at {time}</div>
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