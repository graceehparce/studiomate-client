import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { RegisterStudent } from "./components/auth/RegisterStudent"
import { RegisterTeacher } from "./components/auth/RegisterTeacher"
import "./StudioMate.css"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Authorized } from "./components/views/Authorized"


export const StudioMate = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registerStudent" element={<RegisterStudent />} />
        <Route path="/registerTeacher" element={<RegisterTeacher />} />


        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            </Authorized>

        } />
    </Routes>
}

