import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createInvoice } from "../managers/InvoiceManager"

export const InvoiceForm = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const { studentId } = useParams()
    const navigate = useNavigate()

    const notification = {
        notification_type: 2
    }

    const [currentInvoice, setCurrentInvoice] = useState({
        student: studentId,
        date_created: "",
        service_date: "",
        amount: "",
        comment: ""
    })

    const createInvoiceNotification = (notification) => {
        return fetch(`http://localhost:8000/notifications?student=${studentId}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notification)
        })
    }



    const changeInvoiceState = (domEvent) => {
        const newInvoice = Object.assign({}, currentInvoice)
        newInvoice[domEvent.target.name] = domEvent.target.value
        setCurrentInvoice(newInvoice)
    }

    return (
        <form className="invoiceForm">
            <h2 className="invoiceForm_title">Create New Invoice</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date_created">Today's Date: </label>
                    <input type="date" name="date_created" required autoFocus className="form-control"
                        value={currentInvoice.date_created}
                        onChange={changeInvoiceState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="service_date">Service Date: </label>
                    <input type="date" name="service_date" required autoFocus className="form-control"
                        value={currentInvoice.service_date}
                        onChange={changeInvoiceState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="amount">Amount: </label>
                    <input type="amount" name="amount" required autoFocus className="form-control"
                        value={currentInvoice.amount}
                        onChange={changeInvoiceState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comment">Comments: </label>
                    <input type="text" name="comment" required autoFocus className="form-control"
                        value={currentInvoice.comment}
                        onChange={changeInvoiceState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const invoice = {
                        date_created: currentInvoice.date_created,
                        student: parseInt(studentId),
                        service_date: currentInvoice.service_date,
                        amount: parseInt(currentInvoice.amount),
                        comment: currentInvoice.comment
                    }

                    createInvoice(invoice)
                        .then(() => createInvoiceNotification(notification))
                        .then(() => navigate(`/invoices/${studentId}`))
                }}
                className="btn btn-primary">Create</button>
        </form >
    )
}