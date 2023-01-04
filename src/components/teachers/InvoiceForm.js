import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createInvoice } from "../managers/InvoiceManager"
import { useEffect } from "react"
import { getStudent } from "../managers/StudentManager"
import { getTeacher } from "../managers/TeacherManager"
import { Card, Button, TextInput, Badge, Image, Group } from "@mantine/core"
import { Link } from "react-router-dom"
import { IconSquareArrowRight } from "@tabler/icons"
import { DatePicker } from "@mantine/dates"
import "./AssignmentForm.css"





export const InvoiceForm = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [student, setStudent] = useState({})
    const { studentId } = useParams()
    const [teacher, setTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])

    const notification = {
        notification_type: 2
    }

    const [currentInvoice, setCurrentInvoice] = useState({
        student: studentId,
        date_created: "",
        service_date: "",
        amount: "",
        comment: ""
    })

    const createInvoiceNotification = (notification) => {
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

    const changeInvoiceState = (domEvent) => {
        const newInvoice = Object.assign({}, currentInvoice)
        newInvoice[domEvent.target.name] = domEvent.target.value
        setCurrentInvoice(newInvoice)
    }

    return (
        <div className="insteadOfNav" style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card className="assignmentForm" shadow="lg" px={30} p="md" radius="lg" withBorder>

                < Link className="picBorder" to={`/students/${studentId}`
                }>
                    <Image
                        radius={100}
                        height={90}
                        width="auto"
                        src={student.img}
                        alt="Student"
                        fit="contain"
                    />
                </Link >
                <h2 className="assignmentForm_title">Create New Invoice</h2>
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
                        <label className="dateLabel">Today's Date:</label>
                        <input size="md" placeholder="pick a date!" label="Today's Date:" type="date" name="date_created" withAsterick
                            value={currentInvoice.date_created}
                            onChange={changeInvoiceState}
                        />
                    </div>
                    <div className="datePicker">
                        <label className="dateLabel">Date of Service: </label>
                        <input size="md" placeholder="pick a date" label="Date of Service:" type="date" name="service_date" required autoFocus withAsterick className="form-control"
                            value={currentInvoice.service_date}
                            onChange={changeInvoiceState}
                        />
                    </div>
                    <TextInput size="md" placeholder="$" label="Cost of Service:" withAsterick type="amount" name="amount" required autoFocus className="form-control"
                        value={currentInvoice.amount}
                        onChange={changeInvoiceState}
                    />
                    <TextInput size="md" placeholder="Anything Else?" label="Comments:" withAsterick type="comment" name="comment" required autoFocus className="form-control"
                        value={currentInvoice.comment}
                        onChange={changeInvoiceState}
                    />
                </div>
                <Group className="buttonCreate" position="center" spacing='sm' grow>

                    <Button
                        variant="light"
                        color="orangy"
                        radius={20}
                        type="submit"
                        onClick={evt => {
                            evt.preventDefault()

                            const invoice = {
                                date_created: currentInvoice.date_created,
                                student: parseInt(studentId),
                                service_date: currentInvoice.service_date,
                                amount: parseInt(currentInvoice.amount),
                                comment: currentInvoice.comment
                            }

                            createInvoice(invoice)
                                .then(() => createInvoiceNotification(notification))
                                .then(() => navigate(`/invoices/${studentId}`))
                        }}
                        className="btn btn-primary">Create</Button>
                </Group>
            </Card >
        </div >
    )
}

