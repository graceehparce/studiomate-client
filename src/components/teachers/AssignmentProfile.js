import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getAssignment } from "../managers/AssignmentManager"
import { Link } from "react-router-dom"
import { Image, Card, Badge } from "@mantine/core"
import "./AssignmentProfile.css"


export const AssignmentProfile = () => {
    const [assignment, setAssignment] = useState([])
    const { assignmentId } = useParams()
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    useEffect(() => {
        getAssignment(assignmentId).then(data => setAssignment(data))
    }, [])



    return (
        <div style={{
            width: 700, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    {
                        SMTokenObject.is_staff === true
                            ?
                            <Link to={`/students/${assignment?.student?.id}`}>
                                <Image
                                    radius={100}
                                    height={100}
                                    width="auto"
                                    src={assignment?.student?.img}
                                    alt="Student"
                                    fit="contain"
                                />
                            </Link>
                            :
                            <Link to={`/myStudentProfile`}>
                                <Image
                                    radius={100}
                                    height={100}
                                    width="auto"
                                    src={assignment?.student?.img}
                                    alt="Student"
                                    fit="contain"
                                />
                            </Link>
                    }
                    <div style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h1 className="assignmentTitle" mt="lg" color="dark" size="" weight={700}>{assignment?.student?.full_name}'s assignment</h1>
                        <Badge
                            size="lg"
                            color="orangy"
                            variant="light"
                            radius={30} >
                            Date: {assignment.date_created}
                        </Badge>
                    </div>
                </Card.Section>
                <div className="content">
                    <div className="category">Fundamentals: </div>
                    <div className="response">{assignment.fundamentals}</div>
                    <div className="category">Repertoire: </div>
                    <div className="response">{assignment.repertoire}</div>
                    <div className="category">Comments: </div>
                    <div className="response">{assignment.comments}</div>
                </div>
            </Card>
        </div>
    )
}