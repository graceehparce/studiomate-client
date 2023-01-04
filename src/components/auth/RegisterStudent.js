import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"
import { useState } from "react"
import { useEffect } from "react"
import { Button, TextInput, Card, BackgroundImage, Image } from "@mantine/core"
import piano from "../images/bigPiano.jpg"
import logo from "../images/Mate.png"
import "./Login.css"



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
        <BackgroundImage src={piano} fit="contain">
            <div className="registerBox" style={{
                width: 700, marginLeft: 'auto', marginRight: 'auto'
            }}>
                <Card shadow="lg" px={30} radius="lg" withBorder>
                    <dialog className="dialog dialog--password" ref={passwordDialog}>
                        <div>Passwords do not match</div>
                        <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                    </dialog>

                    <form className="form--login" onSubmit={handleRegister}>
                        <Image className="logoPicLogin" height={100} fit="contain" src={logo} alt="StudentImg" />
                        <div className="registerHeading">Register an account:</div>
                        <TextInput size="xs" label="First Name:" ref={first_name} type="text" name="first_name" className="form-control" placeholder="First name" required autoFocus />
                        <TextInput size="xs" label="Last Name:" ref={last_name} type="text" name="last_name" className="form-control" placeholder="Last name" required />
                        <TextInput size="xs" label="Email:" ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                        <TextInput size="xs" label="Username:" ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                        <TextInput size="xs" label="Phone Number:" ref={phone_number} type="text" name="phone_number" className="form-control" placeholder="Phone number" required />
                        <div className="selectSection">
                            <label className="selectHeading" htmlFor="inputTeacher">Who's your teacher?</label>
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
                        </div>
                        <TextInput size="xs" label="Profile Image:" ref={img} type="text" name="img" className="form-control" placeholder="Img" required />
                        <TextInput size="xs" label="Password:" ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                        <TextInput size="xs" label="Verify Password:" ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        <div className="buttonArea">
                            <Button
                                variant="light"
                                color="orangy"
                                radius={20}
                                className="registerButton"
                                type="submit">Register</Button>
                            <section className="link--register">
                                Already registered? <Link to="/">Login</Link>
                            </section>
                        </div>
                    </form>
                </Card>
            </div>
        </BackgroundImage >
    )
}

