
const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getTeachers = () => {
    return fetch("http://localhost:8000/teachers", {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getSingleTeacher = (teacherId) => {
    return fetch(`http://localhost:8000/teachers/${teacherId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getTeacher = () => {

    return fetch(`http://localhost:8000/teachers?status=myProfile`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())

}


export const updateTeacher = (teacher) => {
    return fetch(`http://localhost:8000/teachers/${teacher}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${SMTokenObject.token}`
        },
        body: JSON.stringify(teacher)
    })
}

export const getMyTeacher = (studentId) => {

    return fetch(`http://localhost:8000/teachers?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())

}