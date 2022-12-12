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


export const TeacherViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>StudioMate</h1>
                    <div>The one stop shop for you and your studiomates!</div>

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





            </Route>
        </Routes>
    )
}