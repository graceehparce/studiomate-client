const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getLessons = () => {
    return fetch(`http://localhost:8000/requests`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getStudentLessons = (studentId) => {
    return fetch(`http://localhost:8000/requests?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const createRequest = (event) => {
    return fetch("http://localhost:8000/requests", {
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

export const deleteRequest = (requestId) => {
    return fetch(`http://localhost:8000/requests/${requestId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
}
