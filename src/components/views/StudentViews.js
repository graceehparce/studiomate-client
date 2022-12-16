import React from "react"
import { StudentProfile } from "../students/StudentProfile"
import { Outlet, Route, Routes } from "react-router-dom"
import { StudentsTeacherProfile } from "../students/StudentsTeacherProfile"
import { EditStudentProfile } from "../students/EditStudentProfile"
import { InvoicesList } from "../teachers/InvoicesList"
import { ResourceList } from "../teachers/ResourceList"
import { InvoiceProfile } from "../teachers/InvoiceProfile"
import { AssignmentList } from "../teachers/AssignmentList"
import { MessagesByStudent } from "../students/StudentMessages"
import { StudentLessonList } from "../teachers/StudentLessonList"

export const StudentViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>StudioMate</h1>
                    <div>The one stop shop for you and your studiomates!</div>

                    <Outlet />
                </>
            }>
                <Route path="myStudentProfile" element={<StudentProfile />} />
                <Route path="teacher/:studentId" element={<StudentsTeacherProfile />} />
                <Route path="studentProfileEdit/:studentId" element={<EditStudentProfile />} />
                <Route path="/invoices/:studentId" element={<InvoicesList />} />
                <Route path="/resources/:teacherId" element={<ResourceList />} />
                <Route path="/invoice/:invoiceId" element={<InvoiceProfile />} />
                <Route path="/assignments/:studentId" element={<AssignmentList />} />
                <Route path="/studentMessages/:teacherId" element={<MessagesByStudent />} />
                <Route path="/lessons/:studentId" element={<StudentLessonList />} />







            </Route>
        </Routes>
    )
}