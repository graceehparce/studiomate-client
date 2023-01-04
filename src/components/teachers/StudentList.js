import React, { useEffect } from "react"
import { getStudents } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Group, Text, Title, Button, Avatar } from "@mantine/core"
import "./StudentList.css"

export const StudentList = () => {
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])



    return (

        <Group className="insteadOfNav" position="center">
            {
                students.map(student => {
                    return <Card shadow="lg" px={20} p="lg" radius="lg" withBorder>
                        <div className="avatarCenter">
                            <Avatar className="avatarBox" radius="xl" size={150} src={student.img} alt="StudentImg" />
                        </div>
                        <Title mt="md" color="dark" size="lg" weight={700}>{student.full_name}</Title>
                        <Text size="sm">Phone: {student.phone_number}</Text>
                        <Text size="sm">Email: {student.email}</Text>
                        <div className="buttonContainer">
                            <Button variant="light"
                                color="orangy"
                                radius={20}
                                onClick={() => {
                                    navigate({ pathname: `/students/${student.id}` })
                                }}>View Profile</Button>
                        </div>
                    </Card>
                })
            }
        </Group >
    )
}