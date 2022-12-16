import React, { useEffect } from "react"
import { useState } from "react"
import { getLessons } from "../managers/RequestManager"

export const LessonsList = () => {
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        getLessons().then(data => setLessons(data))
    }, [])



    return (
        <article>
            <h1>Upcoming Lessons</h1>
            {
                lessons.map(lesson => {
                    if (lesson.accepted === true) {
                        return <div>Lesson with {lesson?.student?.full_name} on {lesson.date} at {lesson.time}</div>
                    }
                    else {
                        return ""
                    }
                })
            }
        </article>
    )
}