import { useNavigate } from "react-router-dom"
import "./NavBar.css"
import { IconUserCircle, IconUsers, IconBellRinging, IconMenu2, IconLogout, IconMail } from "@tabler/icons"
import { Menu, Button, Modal, Image, Group, Text, Avatar } from "@mantine/core"
import logo from "../images/ColoredLogo.jpg"
import { Link } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import { getStudents } from "../managers/StudentManager"
import { useEffect } from "react"
import { useState } from "react"
import { getTeacher } from "../managers/TeacherManager"


export const TeacherNav = () => {
    const navigate = useNavigate()
    const [opened, { close, open }] = useDisclosure(false);
    const [students, setStudents] = useState([])
    const [teacher, setTeacher] = useState({})

    useEffect(() => {
        getTeacher().then(data => setTeacher(data[0]))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])



    return (
        <nav className="navbar">
            <Link className="logoTitleLink" to="/students">
                <Image radius="xl" height={100} src={logo} alt="StudentImg" />
            </Link>
            <div className="navRightSection">
                <Link className="avatar" to="/teacher">
                    <Avatar height={100} radius="xl" src={teacher?.img} alt="teacherImg" />
                </Link>

                <Modal opened={opened} onClose={close} size="sm">
                    <Text className="modalTitle">Click for Messages:</Text>
                    <Group mt="xl">
                        {
                            students.map(student => {
                                return <Link to={`/messages/${student.id}`}>
                                    <Avatar size="lg" radius="xl" src={student.img} alt="studentPics" />
                                </Link>
                            })
                        }
                    </Group>
                </Modal>
                <Group position="center">
                    <Button
                        className="messageButton"
                        variant="light"
                        color="orangy"
                        radius={20} onClick={open}>
                        <IconMail />
                    </Button>
                </Group>
                <section className="navDropDown">
                    <Menu
                        width={300}
                        transition="scale"
                        trigger="hover"
                        openDelay={50}
                        closeDelay={100}
                    >
                        <Menu.Target>
                            <Button size="md" color="orangy">
                                <IconMenu2 />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                icon={<IconUserCircle size={14} />}
                                onClick={() => {
                                    navigate("/teacher");
                                }}
                            >
                                My Profile
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconUsers size={14} />}
                                onClick={() => {
                                    navigate("/students");
                                }}
                            >
                                My Studio
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconBellRinging size={14} />}
                                onClick={() => {
                                    navigate("/notifications");
                                }}
                            >
                                Notifications
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



