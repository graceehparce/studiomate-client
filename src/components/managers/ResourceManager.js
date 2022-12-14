const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getResources = (teacherId) => {
    return fetch(`http://localhost:8000/resources?teacher=${teacherId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}


export const createResource = (event) => {
    return fetch("http://localhost:8000/resources", {
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

export const deleteResource = (resourceId) => {
    return fetch(`http://localhost:8000/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
}