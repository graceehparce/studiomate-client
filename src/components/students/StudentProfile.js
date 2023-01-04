import React, { useEffect } from "react"
import { getMyStudent } from "../managers/StudentManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Image, Button, Text, Title, Group } from "@mantine/core"
import "./StudentProfile.css"


export const StudentProfile = () => {
    const [student, setStudent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getMyStudent().then(data => setStudent(data[0]))
    }, [])



    return (
        <div className="insteadOfNav" style={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div className="profilePic" style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                        <Image
                            radius={30}
                            height={230}
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
                <div className="editSection">
                    <Group position="center" spacing='sm' grow>
                        <Button variant="light"
                            color="orangy"
                            radius={20}
                            onClick={() => {
                                navigate({ pathname: `/assignments/${student.id}` })
                            }}>Assignments
                        </Button>
                        <Button variant="light"
                            color="orangy"
                            radius={20}
                            onClick={() => {
                                navigate({ pathname: `/invoices/${student.id}` })
                            }}>Invoices
                        </Button>
                        <Button variant="light"
                            color="orangy"
                            radius={20}
                            onClick={() => {
                                navigate({ pathname: `/lessons/${student.id}` })
                            }}>Schedule
                        </Button>
                    </Group>
                </div>
                <div className="editSection">
                    <Group position="center" spacing='sm' grow>
                        <Button variant="dark"
                            color="orangy"
                            radius={20}
                            className="edit_profile"
                            onClick={() => {
                                navigate({ pathname: `/studentProfileEdit/${student.id}` })
                            }}>Edit Profile</Button>
                    </Group>
                </div>
            </Card>
        </div>
    )
}