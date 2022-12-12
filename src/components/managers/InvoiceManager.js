const localSM = localStorage.getItem("sm_token")
const SMTokenObject = JSON.parse(localSM)

export const getInvoices = (studentId) => {
    return fetch(`http://localhost:8000/invoices?student=${studentId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())
}

export const getInvoice = (invoiceId) => {

    return fetch(`http://localhost:8000/invoices/${invoiceId}`, {
        headers: {
            "Authorization": `Token ${SMTokenObject.token}`
        }
    })
        .then(response => response.json())

}

export const createInvoice = (event) => {
    return fetch("http://localhost:8000/invoices", {
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