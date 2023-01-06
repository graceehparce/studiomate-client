import { Button, TextInput, Card, Image, Badge } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createAssignment } from "../managers/AssignmentManager"
import { Link } from "react-router-dom"
import { getStudent } from "../managers/StudentManager"
import { useEffect } from "react"
import "./AssignmentForm.css"
import { getTeacher } from "../managers/TeacherManager"
import { IconSquareArrowRight } from "@tabler/icons"
import { Group } from "@mantine/core"



export const AssignmentForm = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [student, setStudent] = useState({})
    const { studentId } = useParams()
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()
    const notification = {
        notification_type: 3
    }

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    const [currentAssignment, setCurrentAssignment] = useState({
        student: studentId,
        fundamentals: "",
        repertoire: "",
        date_created: "",
        comments: ""
    })

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])



    const changeAssignmentState = (domEvent) => {
        const newAssignment = Object.assign({}, currentAssignment)
        newAssignment[domEvent.target.name] = domEvent.target.value
        setCurrentAssignment(newAssignment)
    }

    const createAssignmentNotification = (notification) => {
        return fetch(`http://localhost:8000/notifications?student=${studentId}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notification)
        })
    }



    return (
        <div className="insteadOfNav" style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card className="assignmentForm" shadow="lg" px={30} p="md" radius="lg" withBorder>
                <Link className="picBorder" to={`/students/${studentId}`}>
                    <Image
                        radius={100}
                        height={90}
                        width="auto"
                        src={student.img}
                        alt="Student"
                        fit="contain"
                    />
                </Link>
                <h2 className="assignmentForm_title">Create New Assignment</h2>
                <Badge
                    className="badge"
                    size="xl"
                    color="orangy"
                    variant="dark"
                    radius={30} >{teacher.full_name}
                    <IconSquareArrowRight />
                    {student.full_name}
                </Badge>
                <div className="inputBox">
                    <div className="datePicker">
                        <label className="dateLabel">Date:</label>
                        <input size="md" placeholder="Assignment's Date" label="Date:" type="date" name="date_created" required autoFocus withAsterick className="form-control"
                            value={currentAssignment.date_created}
                            onChange={changeAssignmentState}
                        />
                    </div>
                    <TextInput size="md" placeholder="scales, arpeggios, technique exercises..." label="Fundamentals:" withAsterick type="fundamentals" name="fundamentals" required autoFocus className="form-control"
                        value={currentAssignment.fundamentals}
                        onChange={changeAssignmentState}
                    />
                    <TextInput size="md" placeholder="working repertoire" label="Repertoire:" type="text" name="repertoire" required autoFocus className="form-control"
                        value={currentAssignment.repertoire}
                        onChange={changeAssignmentState}
                    />
                    <TextInput size="md" placeholder="anything else you need to say!" label="Comments:" type="text" name="comments" required autoFocus className="form-control"
                        value={currentAssignment.comments}
                        onChange={changeAssignmentState}
                    />
                </div>
                <Group className="buttonCreate" position="center" spacing='sm' grow>
                    <Button
                        variant="light"
                        color="orangy"
                        radius={20} type="submit"
                        onClick={evt => {
                            evt.preventDefault()

                            const assignment = {
                                date_created: currentAssignment.date_created,
                                student: studentId,
                                fundamentals: currentAssignment.fundamentals,
                                repertoire: currentAssignment.repertoire,
                                comments: currentAssignment.comments
                            }

                            createAssignment(assignment)
                                .then(() => createAssignmentNotification(notification))
                                .then(() => navigate(`/assignments/${studentId}`))
                        }}
                        className="btn btn-primary">Create</Button>
                </Group>
            </Card>
        </div >
    )
}