import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTeacher } from "../managers/TeacherManager"
import { useEffect } from "react"
import { getTeacher } from "../managers/TeacherManager"
import { Button, TextInput, Card } from "@mantine/core"
import "./EditProfile.css"


export const EditProfileForm = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const { teacherId } = useParams()
    const [currentTeacher, setCurrentTeacher] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTeacher().then(data => setCurrentTeacher(data[0]))
    }, [])


    const updateTeacher = (teacher) => {
        return fetch(`http://localhost:8000/teachers/${teacherId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacher)
        })
    }


    const changeTeacherState = (domEvent) => {
        const newTeacher = Object.assign({}, currentTeacher)
        newTeacher[domEvent.target.name] = domEvent.target.value
        setCurrentTeacher(newTeacher)
    }

    return (
        <div style={{
            width: 700, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="lg" px={30} p="md" radius="lg" withBorder>
                <h2 className="assignmentForm_title">Edit Profile Here</h2>
                <TextInput label="Phone Number:" placeholder={currentTeacher.phone_number} type="text" name="phone_number" required autoFocus className="form-control"
                    value={currentTeacher.phone_number}
                    onChange={changeTeacherState}
                />

                <TextInput label="First Name:" placeholder={currentTeacher.firstName} type="text" name="first_name" required autoFocus className="form-control"
                    value={currentTeacher.first_name}
                    onChange={changeTeacherState}
                />
                <TextInput label="Last Name:" placeholder={currentTeacher.last_name} type="text" name="last_name" required autoFocus className="form-control"
                    value={currentTeacher.last_name}
                    onChange={changeTeacherState}
                />

                <TextInput label="Profile Image:" placeholder={currentTeacher.img} type="text" name="img" required autoFocus className="form-control"
                    value={currentTeacher.img}
                    onChange={changeTeacherState}
                />
                <TextInput label="Email:" placeholder={currentTeacher.email} type="text" name="email" required autoFocus className="form-control"
                    value={currentTeacher.email}
                    onChange={changeTeacherState}
                />
                <div className="profileEditButton">
                    <Button
                        variant="light"
                        color="orangy"
                        radius={20}
                        type="submit"
                        onClick={evt => {
                            evt.preventDefault()

                            const teacher = {
                                phone_number: currentTeacher.phone_number,
                                img: currentTeacher.img,
                                first_name: currentTeacher.first_name,
                                last_name: currentTeacher.last_name,
                                email: currentTeacher.email,
                                id: parseInt(teacherId)
                            }


                            updateTeacher(teacher)
                                .then(() => navigate(`/teacher`))
                        }}
                        className="btn btn-primary">Update</Button>
                </div>
            </Card>
        </div>
    )
}