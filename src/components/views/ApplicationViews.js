import { TeacherViews } from "./TeacherViews"
import { StudentViews } from "./StudentViews"


export const ApplicationViews = () => {

    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    if (SMTokenObject.is_staff === true) {
        return <TeacherViews />
    }
    else {
        return <StudentViews />
    }
}