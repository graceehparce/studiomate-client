import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"
import logo from "../images/Mate.png"
import { Button, Image, TextInput, Card, Group, BackgroundImage } from "@mantine/core"
import "./Login.css"
import piano from "../images/bigPiano.jpg"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res && "is_staff" in res) {
                    localStorage.setItem("sm_token", JSON.stringify(res))
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <BackgroundImage src={piano} fit="contain"
        >
            <div className="loginBox" style={{
                width: 700, marginLeft: 'auto', marginRight: 'auto'
            }}>
                <Card shadow="lg" px={30} radius="lg" withBorder>
                    <dialog className="dialog dialog--auth" ref={invalidDialog}>
                        <div>Username or password was not valid.</div>
                        <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
                    </dialog>
                    <section className="mainSection">
                        <form onSubmit={handleLogin}>
                            <Image className="logoPicLogin" height={150} fit="contain" src={logo} alt="StudentImg" />
                            <h2>Please sign in:</h2>
                            <TextInput label="Username:" ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                            <TextInput label="Password:" ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                            <Group position="center" spacing='sm' grow>
                                <Button
                                    variant="light"
                                    color="orangy"
                                    radius={20}
                                    type="submit"
                                    className="signInButton" >
                                    Sign In
                                </Button>
                            </Group>
                            <section className="registerSection">
                                <Link className="linkRegister1" to="/registerStudent">New Student?</Link>
                                <Link className="linkRegister2" to="/registerTeacher">New Teacher?</Link>
                            </section>
                        </form>
                    </section>
                </Card>
            </div>
        </BackgroundImage>
    )
}


