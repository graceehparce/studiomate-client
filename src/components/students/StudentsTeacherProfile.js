import React, { useEffect } from "react"
import { useState } from "react"
import { getMyTeacher } from "../managers/TeacherManager"
import { Link, useParams } from "react-router-dom"
import { Card, Title, Text, Image, Button } from "@mantine/core"
import { IconMessages, IconBook } from "@tabler/icons"
import { useNavigate } from "react-router-dom"

export const StudentsTeacherProfile = () => {
    const [teacher, setTeacher] = useState({})
    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getMyTeacher(studentId).then(data => setTeacher(data[0]))
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
                            src={teacher.img}
                            alt="Teacher"
                            fit="contain"
                        />
                    </div>
                    <Title mt="md" color="dark" size="" weight={700}>{teacher.full_name}</Title>
                    <Text>Phone: {teacher.phone_number}</Text>
                    <Text>Email: {teacher.email}</Text>
                </Card.Section>
                <div className="buttonListSection">
                    <Button
                        className="buttonListProfile"
                        variant="light"
                        uppercase="true"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/studentMessages/${teacher.id}` })
                        }}>
                        <IconMessages />
                        Messages
                    </Button>
                    <Button
                        className="buttonListProfile"
                        variant="light"
                        uppercase="true"
                        color="orangy"
                        radius={20} onClick={() => {
                            navigate({ pathname: `/resources/${teacher.id}` })
                        }}>
                        <IconBook />
                        Resources
                    </Button>
                </div>
            </Card>
        </div>
    )
}