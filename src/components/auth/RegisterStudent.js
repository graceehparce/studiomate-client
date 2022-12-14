import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"
import { useState } from "react"
import { useEffect } from "react"

export const RegisterStudent = () => {
    const [teachers, setTeachers] = useState([])
    const first_name = useRef()
    const last_name = useRef()
    const username = useRef()
    const phone_number = useRef()
    const teacher = useRef()
    const email = useRef()
    const password = useRef()
    const img = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

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

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": first_name.current.value,
                "email": email.current.value,
                "last_name": last_name.current.value,
                "phone_number": phone_number.current.value,
                "password": password.current.value,
                "teacher": teacher.current.value,
                "img": img.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("sm_token", JSON.stringify(res)
                        )
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail">Email</label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPhoneNumber">Phone Number</label>
                    <input ref={phone_number} type="text" name="phone_number" className="form-control" placeholder="Phone number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputTeacher">Who's your teacher?</label>
                    <select
                        ref={teacher}
                        type="select"
                        name="teacher"
                        placeholder="teacher"
                        className="form-select">
                        <option value="0"></option>
                        {
                            teachers.map((teacher) => {
                                return <option value={teacher.id}>{teacher.full_name}</option>
                            }
                            )
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputImg">Profile Image</label>
                    <input ref={img} type="text" name="img" className="form-control" placeholder="Img" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/">Login</Link>
            </section>
        </main>
    )
}

