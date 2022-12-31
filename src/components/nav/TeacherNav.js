import { useNavigate } from "react-router-dom"
import "./NavBar.css"
import { IconUserCircle, IconUsers, IconBellRinging, IconMenu2, IconLogout } from "@tabler/icons"
import { Menu, Button } from "@mantine/core"
import logo from "../images/logo.jpg"
import { Link } from "react-router-dom"
import { Image } from "@mantine/core"




export const TeacherNav = () => {
    const navigate = useNavigate()


    return (
        <nav className="navbar">

            <Link className="logoTitleLink" to="/students">
                <Image height={100} src={logo} alt="StudentImg" />
            </Link>
            <section className="navDropDown">
                <Menu
                    width={300}
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
        </nav>
    )
}



