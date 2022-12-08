
const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getStudents = () => {
    return fetch("http://localhost:8000/students", {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getStudent = (studentId) => {

    return fetch(`http://localhost:8000/students/${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())

}