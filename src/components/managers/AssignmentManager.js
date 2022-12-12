const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getAssignments = (studentId) => {
    return fetch(`http://localhost:8000/assignments?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getAssignment = (assignmentId) => {

    return fetch(`http://localhost:8000/assignments/${assignmentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())

}

export const createAssignment = (event) => {
    return fetch("http://localhost:8000/assignments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${SMTokenObject.token}`
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

