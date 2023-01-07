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
    const [upload, setImageState] = useState(false)

    useEffect(() => {
        getTeacher().then(data => {
            let teacherUser = {
                first_name: data[0].user.first_name,
                last_name: data[0].user.last_name,
                phone_number: data[0].phone_number,
                email: data[0].email,
                img: data[0].img
            }
            setCurrentTeacher(teacherUser)
        })
    }, [])

    useEffect(() => {
        let tempTeacher = currentTeacher
        tempTeacher.img = upload
        setCurrentTeacher(tempTeacher)
    }, [upload])



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
        if (upload === false) {
            setCurrentTeacher(newTeacher)
        }
        else {
            newTeacher.img = upload
            setCurrentTeacher(newTeacher)
        }
    }


    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dcfiyfyfx`,
            uploadPreset: `axwgcngu`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    setImageState(result.info.url)
                }
            });
        widget.open()
    }

    return (
        <div className="insteadOfNav" style={{
            width: 600, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card className="editProfileForm" shadow="lg" px={30} p="md" radius="lg" withBorder>
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
                {
                    !upload
                        ? < Button
                            label="Profile Image:"
                            className="uploadButton"
                            variant="outline"
                            color="orangy"
                            radius={20}
                            onClick={(clickEvent) => showWidget(clickEvent)
                            }> Upload Image</Button>
                        :
                        <Button
                            className="uploadButton"
                            variant="light"
                            color="green"
                            radius={20}
                            onClick={(clickEvent) => showWidget(clickEvent)
                            }> Image Upload Complete</Button>
                }

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