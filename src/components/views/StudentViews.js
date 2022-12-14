import React from "react"
import { StudentProfile } from "../students/StudentProfile"
import { Outlet, Route, Routes } from "react-router-dom"
import { StudentsTeacherProfile } from "../students/StudentsTeacherProfile"


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
                <Route path="myStudentProfile/:studentId" element={<StudentProfile />} />
                <Route path="teacher/:studentId" element={<StudentsTeacherProfile />} />


            </Route>
        </Routes>
    )
}