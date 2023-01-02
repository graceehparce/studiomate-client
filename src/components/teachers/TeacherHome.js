import { BackgroundImage } from "@mantine/core"
import pic from "../images/OpeningPage.jpg"
import { IconArrowBigRightLine } from "@tabler/icons"
import { getTeacher } from "../managers/TeacherManager"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export const TeacherHome = () => {
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    return (
        <BackgroundImage src={pic} fit="contain">

            <div style={{ height: 600, marginLeft: 'auto', marginRight: 'auto' }}>        </div>

        </BackgroundImage>
    )
}