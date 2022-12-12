import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTeacher } from "../managers/TeacherManager"
import { useEffect } from "react"
import { getTeacher } from "../managers/TeacherManager"

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
        <form className="assignmentForm">
            <h2 className="assignmentForm_title">Edit Profile Here</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number: </label>
                    <input placeholder={currentTeacher.phone_number} type="text" name="phone_number" required autoFocus className="form-control"
                        value={currentTeacher.phone_number}
                        onChange={changeTeacherState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="first_name">First Name: </label>
                    <input placeholder={currentTeacher.firstName} type="text" name="first_name" required autoFocus className="form-control"
                        value={currentTeacher.first_name}
                        onChange={changeTeacherState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name: </label>
                    <input placeholder={currentTeacher.last_name} type="text" name="last_name" required autoFocus className="form-control"
                        value={currentTeacher.last_name}
                        onChange={changeTeacherState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="img">Profile Image: </label>
                    <input placeholder={currentTeacher.img} type="text" name="img" required autoFocus className="form-control"
                        value={currentTeacher.img}
                        onChange={changeTeacherState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input placeholder={currentTeacher.email} type="text" name="email" required autoFocus className="form-control"
                        value={currentTeacher.email}
                        onChange={changeTeacherState}
                    />
                </div>
            </fieldset>
            <button type="submit"
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
                className="btn btn-primary">Update</button>
        </form >
    )
}