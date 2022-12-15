const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getMessages = (studentId) => {
    return fetch(`http://localhost:8000/messages?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getMessagesByTeacher = (teacherId) => {
    return fetch(`http://localhost:8000/messages?teacher=${teacherId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getMessagesByStudent = (studentId) => {
    return fetch(`http://localhost:8000/messages?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const createMessage = (event) => {
    return fetch("http://localhost:8000/messages", {
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

