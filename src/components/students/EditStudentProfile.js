import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react"
import { getMyStudent } from "../managers/StudentManager"

export const EditStudentProfile = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const { studentId } = useParams()
    const [currentStudent, setCurrentStudent] = useState({})
    const [teachers, setTeachers] = useState([])

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
        const newStudent = Object.assign({}, currentStudent)
        newStudent[domEvent.target.name] = domEvent.target.value
        setCurrentStudent(newStudent)
    }

    return (
        <form className="assignmentForm">
            <h2 className="assignmentForm_title">Edit Profile Here</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number: </label>
                    <input placeholder={currentStudent.phone_number} type="text" name="phone_number" required autoFocus className="form-control"
                        value={currentStudent.phone_number}
                        onChange={changeStudentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="first_name">First Name: </label>
                    <input placeholder={currentStudent.first_name} type="text" name="first_name" required autoFocus className="form-control"
                        value={currentStudent.first_name}
                        onChange={changeStudentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name: </label>
                    <input placeholder={currentStudent.last_name} type="text" name="last_name" required autoFocus className="form-control"
                        value={currentStudent.last_name}
                        onChange={changeStudentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="inputTeacher">Who's your teacher?</label>
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
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="img">Profile Image: </label>
                    <input placeholder={currentStudent.img} type="text" name="img" required autoFocus className="form-control"
                        value={currentStudent.img}
                        onChange={changeStudentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input placeholder={currentStudent.email} type="text" name="email" required autoFocus className="form-control"
                        value={currentStudent.email}
                        onChange={changeStudentState}
                    />
                </div>
            </fieldset>
            <button type="submit"
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
                className="btn btn-primary">Update</button>
        </form >
    )
}