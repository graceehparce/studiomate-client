import React, { useEffect } from "react"
import { useState } from "react"
import { getTeacher } from "../managers/TeacherManager"
import { useNavigate } from "react-router-dom"
import { Button, Card, Group, Title, Image, Text } from "@mantine/core"
import "./TeacherProfile.css"


export const TeacherProfile = () => {
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])



    return (
        <div className="insteadOfNav" style={{
            width: 500, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                        <Image
                            radius={30}
                            height={230}
                            width={230}
                            src={teacher.img}
                            alt="Teacher"
                            fit="contain"
                        />
                    </div>
                    <Title mt="md" color="dark" size="" weight={700}>{teacher.full_name}</Title>
                    <Text>Phone: {teacher.phone_number}</Text>
                    <Text>Email: {teacher.email}</Text>
                </Card.Section>
                <div className="editSection">
                    <Group position="center" spacing='sm' grow>
                        <Button variant="light"
                            color="orangy"
                            radius={20} onClick={() => {
                                navigate({ pathname: `/resources/${teacher.id}` })
                            }}>
                            Resources
                        </Button>
                        <Button variant="light"
                            color="orangy"
                            radius={20} onClick={() => {
                                navigate({ pathname: `/students` })
                            }}>
                            Studio
                        </Button>
                        <Button variant="light"
                            color="orangy"
                            radius={20} onClick={() => {
                                navigate({ pathname: `/lessons` })
                            }}>
                            Lessons
                        </Button>
                    </Group>
                </div>
                <div className="editSection">
                    <Group position="center" spacing='sm' grow>
                        <Button variant="dark"
                            color="orangy"
                            radius={20}
                            onClick={() => {
                                navigate({ pathname: `/editProfileForm/${teacher.id}` })
                            }}>Edit Profile</Button>
                    </Group>
                </div>
            </Card >
        </div >)
}
