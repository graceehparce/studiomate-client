import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAssignments } from "../managers/AssignmentManager"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { Card, Title, Image, Button, Badge } from "@mantine/core"
import "./AssignmentList.css"
import { IconPencil } from "@tabler/icons"



export const AssignmentList = () => {
    const [assignments, setAssignments] = useState([])
    const [student, setStudent] = useState({})
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAssignments(studentId).then(data => setAssignments(data))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])





    return (
        <div className="insteadOfNav" style={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <Card shadow="lg" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div className="assignmentPicBox" style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        {
                            SMTokenObject.is_staff === true
                                ?
                                <Link to={`/students/${student.id}`}>
                                    <Image
                                        radius={100}
                                        height={100}
                                        width="auto"
                                        src={student.img}
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
                                        src={student.img}
                                        alt="Student"
                                        fit="contain"
                                    />
                                </Link>
                        }
                        <h2 className="assignmentListHeading">{student.full_name}'s Assignments</h2>

                    </div>
                </Card.Section>
                <div className="listSection">
                    {
                        SMTokenObject.is_staff === true
                            ?

                            <Button
                                variant="light"
                                color="orangy"
                                radius={20}
                                onClick={() => {
                                    navigate({ pathname: `/assignmentForm/${studentId}` })
                                }}>Create New Assignment</Button>
                            :
                            ""
                    }
                    {
                        assignments.map(assignment => {
                            return <section key={`assignment--${assignment.id}`} className="assignment">
                                <Button
                                    className="buttonList"
                                    variant="outline"
                                    color="orangy"
                                    radius={20}
                                    onClick={() => {
                                        navigate({ pathname: `/assignment/${assignment.id}` })
                                    }}>Assignments {assignment.date_created}</Button>
                            </section>
                        })
                    }
                </div>
            </Card >
        </div >
    )
}