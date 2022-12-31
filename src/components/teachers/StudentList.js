import React, { useEffect } from "react"
import { getStudents } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Group, Text, Image, Title, Button } from "@mantine/core"
import "./StudentList.css"

export const StudentList = () => {
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])



    return (
        <Group>
            {
                students.map(student => {
                    return <Card shadow="lg" px={50} p="lg" radius="lg" withBorder>
                        <div className="borderBox">
                            <Image radius={20} height={200} src={student.img} alt="StudentImg" />
                        </div>
                        <Title mt="md" color="dark" size="" weight={700}>{student.full_name}</Title>
                        <Text>Phone: {student.phone_number}</Text>
                        <Text>Email: {student.email}</Text>
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