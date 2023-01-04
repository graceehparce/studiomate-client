import { Text } from "@mantine/core"
import { getTeacher } from "../managers/TeacherManager"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TeacherHome.css"




export const TeacherHome = () => {
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    return (<div className="backgroundSection">
        <Text className="welcomeText" align="center" color="#fff">
            Welcome to StudioMate!
        </Text>
        <Text className="welcomeDes" align="center" color="#fff">The one-stop-shop admin application for you, your student, and their studiomates!</Text>
    </div >
    )
}