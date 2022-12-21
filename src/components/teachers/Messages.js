import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getMessages } from "../managers/MessageManager"
import { getStudent } from "../managers/StudentManager"
import { getTeacher } from "../managers/TeacherManager"
import { createMessage } from "../managers/MessageManager"

export const MessagesByTeacher = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [messages, setMessages] = useState([])
    const [student, setStudent] = useState({})
    const [teacher, setTeacher] = useState({})
    const { studentId } = useParams()
    const navigate = useNavigate()
    const notification = {
        notification_type: 1
    }
    const [currentMessage, setCurrentMessage] = useState({
        content: "",
        recipient: 0

    })

    const changeMessageState = (domEvent) => {
        const newMessage = Object.assign({}, currentMessage)
        newMessage[domEvent.target.name] = domEvent.target.value
        setCurrentMessage(newMessage)
    }

    useEffect(() => {
        getMessages(studentId).then(data => setMessages(data))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    const createMessageNotification = (notification) => {
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
        <article>
            <h1>Messages</h1>
            <img className="student_img" src={student.img} alt=""></img>and
            <img className="teacher_img" src={teacher.img} alt=""></img>

            {
                messages.map(message => {
                    return <section key={`message--${message.id}`} className="message">
                        <div>{message.sender.first_name}{message.date_time}</div>
                        <div>{message.content}</div>
                    </section>
                })
            }
            <form className="messageForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="message">Message: </label>
                        <input type="text" name="content" required autoFocus className="form-control"
                            value={currentMessage.content}
                            onChange={changeMessageState}
                        />
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        const message = {
                            content: currentMessage.content,
                            recipient: student.user.id
                        }

                        createMessage(message)
                            .then(() => createMessageNotification(notification))
                            .then(() => window.location.reload())
                    }}
                    className="btn btn-primary">Send</button>
            </form >
        </article>
    )
}