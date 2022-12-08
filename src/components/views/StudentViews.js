import React from "react"
import { StudentProfile } from "../students/StudentProfile"
import { Outlet, Route, Routes } from "react-router-dom"


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
                <Route path="students/:studentId" element={<StudentProfile />} />

            </Route>
        </Routes>
    )
}