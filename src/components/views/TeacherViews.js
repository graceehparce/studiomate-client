import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { StudentList } from "../teachers/StudentList"
import { TeacherStudentProfile } from "../teachers/TeacherStudentProfile"
import { AssignmentList } from "../teachers/AssignmentList"
import { AssignmentProfile } from "../teachers/AssignmentProfile"
import { AssignmentForm } from "../teachers/AssignmentForm"
import { TeacherProfile } from "../teachers/TeacherProfile"
import { EditProfileForm } from "../teachers/EditProfileForm"
import { InvoiceForm } from "../teachers/InvoiceForm"
import { InvoiceProfile } from "../teachers/InvoiceProfile"
import { InvoicesList } from "../teachers/InvoicesList"
import { MessagesByTeacher } from "../teachers/Messages"
import { ResourceList } from "../teachers/ResourceList"
import { LessonsList } from "../teachers/LessonsList"
import { StudentLessonList } from "../teachers/StudentLessonList"
import { NotificationsList } from "../teachers/Notifications"
import { TeacherHome } from "../teachers/TeacherHome"

export const TeacherViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:studentId" element={<TeacherStudentProfile />} />
                <Route path="/assignments/:studentId" element={<AssignmentList />} />
                <Route path="/assignment/:assignmentId" element={<AssignmentProfile />} />
                <Route path="/assignmentForm/:studentId" element={<AssignmentForm />} />
                <Route path="/teacher" element={<TeacherProfile />} />
                <Route path="/editProfileForm/:teacherId" element={<EditProfileForm />} />
                <Route path="/invoices/:studentId" element={<InvoicesList />} />
                <Route path="/invoice/:invoiceId" element={<InvoiceProfile />} />
                <Route path="/invoiceForm/:studentId" element={<InvoiceForm />} />
                <Route path="/messages/:studentId" element={<MessagesByTeacher />} />
                <Route path="/resources/:teacherId" element={<ResourceList />} />
                <Route path="/lessons" element={<LessonsList />} />
                <Route path="/lessons/:studentId" element={<StudentLessonList />} />
                <Route path="/notifications" element={<NotificationsList />} />
                <Route path="/home" element={<TeacherHome />} />












            </Route>
        </Routes>
    )
}