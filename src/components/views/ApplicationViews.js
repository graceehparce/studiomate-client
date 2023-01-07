import { TeacherViews } from "./TeacherViews"
import { StudentViews } from "./StudentViews"
import { NavBar } from "../nav/NavBar"



export const ApplicationViews = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    if (SMTokenObject.is_staff === true) {
        return <>
            <NavBar />
            <TeacherViews />
        </>
    }
    else {
        return <>
            <NavBar />
            <StudentViews />
        </>
    }
}