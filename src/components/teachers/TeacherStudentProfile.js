import React, { useEffect } from "react"
import { getStudent } from "../managers/StudentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Image, Title, Text, Button, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import "./TeacherStudentProfile.css"
import { IconPencil, IconFileDollar, IconMessages, IconCalendarEvent } from "@tabler/icons"



export const TeacherStudentProfile = () => {
    const [student, setStudent] = useState([])
    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])



    return (
        <div style={{ width: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div className="picBox" style={{ width: 280, marginLeft: 'auto', marginRight: 'auto' }}>
                        <Image
                            radius={40}
                            height={210}
                            width="auto"
                            src={student.img}
                            alt="Teacher"
                            fit="contain"
                        />
                    </div>
                    <Title mt="md" color="dark" size="" weight={700}>{student.full_name}</Title>
                    <Text>Phone: {student.phone_number}</Text>
                    <Text>Email: {student.email}</Text>
                </Card.Section>
                <div className="buttonSection">
                    <Button
                        className="buttonListProfile"
                        variant="light"
                        uppercase="true"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/assignments/${student.id}` })
                        }}>
                        <IconPencil />
                        Assignments
                    </Button>
                    <Button
                        className="buttonListProfile"
                        variant="dark"
                        uppercase="true"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/invoices/${student.id}` })
                        }}>
                        <IconFileDollar />
                        Invoices
                    </Button>
                    <Button
                        className="buttonListProfile"
                        variant="light"
                        uppercase="true"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/messages/${student.id}` })
                        }}>
                        <IconMessages />
                        Messages
                    </Button>
                    <Button
                        className="buttonListProfile"
                        uppercase="true"
                        variant="dark"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/lessons/${student.id}` })
                        }}>
                        <IconCalendarEvent />
                        Schedule
                    </Button>
                </div>
            </Card>
        </div>

    )
}


