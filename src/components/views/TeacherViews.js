import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { StudentList } from "../teachers/StudentList"
import { TeacherStudentProfile } from "../teachers/TeacherStudentProfile"


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
                <Route path="students" element={<StudentList />} />
                <Route path="students/:studentId" element={<TeacherStudentProfile />} />


            </Route>
        </Routes>
    )
}