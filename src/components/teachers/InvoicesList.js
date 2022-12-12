import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getInvoices } from "../managers/InvoiceManager"

export const InvoicesList = () => {
    const [invoices, setInvoices] = useState([])
    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInvoices(studentId).then(data => setInvoices(data))
    }, [])



    return (
        <article>
            <h1>These are your student's invoices:</h1>
            {
                invoices.map(invoice => {
                    return <section key={`assignment--${invoice.id}`} className="invoice">
                        <Link className="invoice_profile" to={`/invoice/${invoice.id}`}>Invoice {invoice.date_created}</Link>
                    </section>
                })
            }
            <button className="new_invoice"
                onClick={() => {
                    navigate({ pathname: `/invoiceForm/${studentId}` })
                }}>Create New Invoice</button>
        </article>
    )
}