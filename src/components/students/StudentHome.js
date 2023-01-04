import { Text } from "@mantine/core"
import { getTeacher } from "../managers/TeacherManager"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./studentHome.css"
import { getMyStudent } from "../managers/StudentManager"




export const StudentHome = () => {
    const [student, setStudent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getMyStudent().then(data => setStudent())
    }, [])

    return (<div className="backgroundSection">
        <Text className="welcomeText" align="center" color="#fff">
            Welcome to StudioMate!
        </Text>
        <Text className="welcomeDes" align="center" color="#fff">The one-stop-shop admin application for you, your student, and their studiomates!</Text>
    </div >
    )
}