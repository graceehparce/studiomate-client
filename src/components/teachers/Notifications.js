import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getInvoices } from "../managers/InvoiceManager"
import { getStudent } from "../managers/StudentManager"

export const NotificationsList = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()




    const getNotifications = () => {
        return fetch(`http://localhost:8000/notifications`, {
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`
            }
        })
            .then(response => response.json())
            .then(data => setLessons(data))
    }



    return (
        <article>
            <h1>{student.full_name}'s invoices:</h1>
            <img className="student_img" src={student.img} alt=""></img>

            {
                invoices.map(invoice => {
                    return <section key={`assignment--${invoice.id}`} className="invoice">
                        <Link className="invoice_profile" to={`/invoice/${invoice.id}`}>Invoice {invoice.date_created}</Link>
                    </section>
                })
            }
            {
                SMTokenObject.is_staff === true
                    ?

                    <button className="new_invoice"
                        onClick={() => {
                            navigate({ pathname: `/invoiceForm/${studentId}` })
                        }}>Create New Invoice</button>
                    :
                    ""

            }
        </article>

    )

}