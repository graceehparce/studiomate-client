import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react"
import { getMyStudent } from "../managers/StudentManager"
import { Button, TextInput, Card } from "@mantine/core"
import "./editProfile.css"



export const EditStudentProfile = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const { studentId } = useParams()
    const [currentStudent, setCurrentStudent] = useState({})
    const [teachers, setTeachers] = useState([])
    const [upload, setImageState] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getMyStudent().then(data => {
            let studentUser = {
                first_name: data[0].user.first_name,
                last_name: data[0].user.last_name,
                phone_number: data[0].phone_number,
                email: data[0].email,
                teacher: data[0].teacher.id,
                img: data[0].img
            }
            setCurrentStudent(studentUser)
        })
    }, [])

    useEffect(() => {
        let tempStudent = currentStudent
        tempStudent.img = upload
        setCurrentStudent(tempStudent)
    }, [upload])

    useEffect(
        () => {
            fetch('http://localhost:8000/teachers')
                .then(response => response.json())
                .then((teacherArray) => {
                    setTeachers(teacherArray)
                })
        },
        []
    )

    const updateStudent = (student) => {
        return fetch(`http://localhost:8000/students/${studentId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
    }


    const changeStudentState = (domEvent) => {
        let newStudent = Object.assign({}, currentStudent)
        newStudent[domEvent.target.name] = domEvent.target.value
        if (upload === false) {
            setCurrentStudent(newStudent)
        }
        else {
            newStudent.img = upload
            setCurrentStudent(newStudent)
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
            width: 700, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card className="studentEditProfile" shadow="lg" px={30} p="md" radius="lg" withBorder>
                <h2 className="assignmentForm_title">Edit Profile Here</h2>
                <TextInput label="Phone Number:" placeholder={currentStudent.phone_number} type="text" name="phone_number" required autoFocus className="form-control"
                    value={currentStudent.phone_number}
                    onChange={changeStudentState}
                />
                <TextInput label="First Name:" placeholder={currentStudent.first_name} type="text" name="first_name" required autoFocus className="form-control"
                    value={currentStudent.first_name}
                    onChange={changeStudentState}
                />

                <TextInput label="Last Name:" placeholder={currentStudent.last_name} type="text" name="last_name" required autoFocus className="form-control"
                    value={currentStudent.last_name}
                    onChange={changeStudentState}
                />
                <div className="teacherPicker">
                    <label className="teacherLabel" htmlFor="inputTeacher">Who's your teacher?</label>
                    <select
                        type="select"
                        name="teacher"
                        required autoFocus
                        className="form-select"
                        onChange={changeStudentState}>
                        <option value={currentStudent.teacher}></option>
                        {
                            teachers.map((teacher) => {
                                return <option selected={teacher.id === currentStudent.teacher} value={teacher.id}>{teacher.full_name}</option>
                            }
                            )
                        }
                    </select>
                </div>
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

                <TextInput label="Email:" placeholder={currentStudent.email} type="text" name="email" required autoFocus className="form-control"
                    value={currentStudent.email}
                    onChange={changeStudentState}
                />
                <div className="profileUpdateButton">
                    <Button
                        variant="light"
                        color="orangy"
                        radius={20} type="submit"
                        onClick={evt => {
                            evt.preventDefault()

                            const student = {
                                phone_number: currentStudent.phone_number,
                                img: currentStudent.img,
                                first_name: currentStudent.first_name,
                                last_name: currentStudent.last_name,
                                email: currentStudent.email,
                                id: parseInt(studentId),
                                teacher: parseInt(currentStudent.teacher)
                            }


                            updateStudent(student)
                                .then(() => navigate(`/myStudentProfile`))
                        }}
                        className="updateButton">Update</Button>
                </div>
            </Card >
        </div >
    )
}