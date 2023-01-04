import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getMyStudent } from "../managers/StudentManager"
import { getMyTeacher } from "../managers/TeacherManager"
import { createMessage } from "../managers/MessageManager"
import { getMessagesByStudent } from "../managers/MessageManager"
import { ScrollArea, Button, Stack, Group, TextInput, Card, Text, Badge, Avatar } from '@mantine/core';
import { IconSwitchHorizontal } from "@tabler/icons"
import "./studentMessages.css"
import { IconMessages } from "@tabler/icons"

export const MessagesByStudent = () => {
    const [messages, setMessages] = useState([])
    const [student, setStudent] = useState({})
    const [teacher, setTeacher] = useState({})
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const notification = {
        notification_type: 1
    }
    const { teacherId } = useParams()

    const [currentMessage, setCurrentMessage] = useState({
        content: "",
        recipient: 0

    })

    const createMessageNotification = (notification) => {
        return fetch(`http://localhost:8000/notifications?teacher=${teacherId}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notification)
        })
    }
    const changeMessageState = (domEvent) => {
        const newMessage = Object.assign({}, currentMessage)
        newMessage[domEvent.target.name] = domEvent.target.value
        setCurrentMessage(newMessage)
    }

    useEffect(() => {
        getMyTeacher(teacherId).then(data => setTeacher(data[0]))
    }, [])

    useEffect(() => {
        getMyStudent().then(data => setStudent(data[0])).then(
        )
    }, [])

    useEffect(() => {
        getMessagesByStudent(student?.id).then(data => setMessages(data))

    }, [student])

    const formatDate = (project) => {
        let initialSplit = project.split("T")
        let formattedDate = initialSplit[0]
        formattedDate = formattedDate.split("-")
        formattedDate = [formattedDate[1], formattedDate[2], formattedDate[0]]
        let finishedDate = formattedDate.join("/")
        let formattedTime = initialSplit[1]
        formattedTime = formattedTime.split(':')
        formattedTime = [formattedTime[0], formattedTime[1]]
        let finishedTime = formattedTime.join(":")
        return `${finishedDate}, ${finishedTime}`
    }


    return (
        <div className="insteadOfNav" style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>

                    <div className="duoPicBox">
                        <Avatar
                            radius="xl"
                            height={100}
                            width="auto"
                            src={student.img}
                            alt="Student"
                            fit="contain"
                        />
                        <IconSwitchHorizontal />
                        <Avatar
                            radius="xl"
                            height={100}
                            width="auto"
                            src={teacher.img}
                            alt="Student"
                            fit="contain"
                        />
                    </div>
                    <Text className="messageTitle">Messages</Text>
                    <div className="labelBox">
                        <Badge
                            className="nameBadge"
                            size="lg"
                            color="orangy"
                            variant="outline"
                            radius={30} >
                            {teacher.full_name} & {student.full_name}
                        </Badge>
                    </div>
                </Card.Section>
                <Stack align="center">
                    <ScrollArea className="scrollArea" style={{ width: 400, height: 300 }} >
                        {
                            messages.map(message => {
                                if (message.sender.id === teacher.user.id) {
                                    const dateTime = formatDate(message.date_time)
                                    return <section className="messageBubble" key={`message--${message.id}`} >
                                        <Avatar
                                            className="messageImg"
                                            radius={100}
                                            height={20}
                                            width="auto"
                                            src={teacher.img}
                                            alt="Student"
                                            fit="contain"
                                        />
                                        <div className="idMessage">
                                            <div className="dateSection2">{dateTime}</div>
                                            <div className="messageContent">{message.content}</div>
                                        </div>

                                    </section>
                                }
                                else {
                                    const dateTime = formatDate(message.date_time)
                                    return <section className="messageBubble2" key={`message--${message.id}`} >
                                        <div className="messageId2">
                                            <div className="dateSection">{dateTime}</div>
                                            <div className="messageContent2">{message.content}</div>
                                        </div>
                                        <Avatar
                                            className="messageImg"
                                            radius={100}
                                            height={20}
                                            width="auto"
                                            src={student.img}
                                            alt="Student"
                                            fit="contain"
                                        />
                                    </section>
                                }
                            })
                        }
                    </ScrollArea>
                </Stack>
                <div className="messageBox">
                    <Group className="messageArea" position="center" grow>
                        <TextInput size="md" placeholder="" label="New Message:" type="text" name="content" required autoFocus className="messageInput"
                            value={currentMessage.content}
                            onChange={changeMessageState}
                        />
                        <Button
                            variant="light"
                            color="orangy"
                            radius={20}
                            type="submit"
                            className="sendButton"
                            onClick={evt => {
                                evt.preventDefault()

                                const message = {
                                    content: currentMessage.content,
                                    recipient: teacher.user.id
                                }

                                createMessage(message)
                                    .then(() => createMessageNotification(notification))
                                    .then(() => window.location.reload())
                            }}
                        >Send</Button>
                    </Group>
                </div>
            </Card>
        </div>
    )
}