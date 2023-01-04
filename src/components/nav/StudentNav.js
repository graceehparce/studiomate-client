import { useNavigate } from "react-router-dom"
import { getMyStudent } from "../managers/StudentManager"
import "./NavBar.css"
import { useState } from "react"
import { useEffect } from "react"
import { Menu, Button, Avatar, Group } from "@mantine/core"
import { IconUserCircle, IconSchool, IconBellRinging, IconMenu2, IconLogout, IconMail } from "@tabler/icons"
import logo from "../images/ColoredLogo.jpg"

import { Link } from "react-router-dom"
import { Image } from "@mantine/core"

export const StudentNav = () => {
    const navigate = useNavigate()
    const [student, setStudent] = useState({})

    useEffect(() => {
        getMyStudent().then(data => setStudent(data[0]))
    }, [])


    return (
        <nav className="navbar">
            <Link className="logoTitleLink" to="/students">
                <Image height={100} src={logo} alt="StudentImg" />
            </Link>
            <div className="navRightSection">
                <Link className="avatar" to="/myStudentProfile">
                    <Avatar height={100} radius="xl" src={student.img} alt="teacherImg" />
                </Link>
                <Group position="center">
                    <Button
                        className="messageButton"
                        variant="light"
                        color="orangy"
                        radius={20}
                        onClick={() => {
                            navigate(`/studentMessages/${student.teacher.id}`);
                        }}>
                        <IconMail />
                    </Button>
                </Group>

                <section className="navDropDown">

                    <Menu
                        transition="scale"
                        trigger="hover"
                        openDelay={50}
                        closeDelay={100}
                    >
                        <Menu.Target>
                            <Button size="lg" color="orangy">
                                <IconMenu2 />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                icon={<IconUserCircle size={14} />}
                                onClick={() => {
                                    navigate(`/myStudentProfile`);
                                }}
                            >
                                My Profile
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconSchool size={14} />}
                                onClick={() => {
                                    navigate(`/teacher/${student.id}`);
                                }}
                            >
                                My Teacher
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconBellRinging size={14} />}
                                onClick={() => {
                                    navigate(`/notifications/${student.id}`);
                                }}
                            >
                                My Notifications
                            </Menu.Item>
                            {
                                localStorage.getItem("sm_token")
                                    ? <Menu.Item
                                        icon={<IconLogout size={14} />}
                                        onClick={() => {
                                            localStorage.removeItem("sm_token")
                                            navigate("/", { replace: true })
                                        }}>Logout
                                    </Menu.Item>

                                    : ""
                            }
                        </Menu.Dropdown>
                    </Menu>
                </section>
            </div>
        </nav>
    )
}



