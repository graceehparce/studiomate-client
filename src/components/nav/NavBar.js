import { TeacherNav } from "./TeacherNav"
import "./NavBar.css"
import { StudentNav } from "./StudentNav"


export const NavBar = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    if (SMTokenObject.is_staff) {
        return <TeacherNav />
    }
    else {
        return <StudentNav />
    }
}