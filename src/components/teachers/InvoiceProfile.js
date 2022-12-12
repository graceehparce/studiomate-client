import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getInvoice } from "../managers/InvoiceManager"

export const InvoiceProfile = () => {
    const [invoice, setInvoice] = useState([])
    const { invoiceId } = useParams()

    useEffect(() => {
        getInvoice(invoiceId).then(data => setInvoice(data))
    }, [])



    return (
        <article className="invoiceProfile">
            <section key={`invoice--${invoice.id}`} className="invoice">
                <div className="invoice_date">Date: {invoice.date_created}</div>
                <div className="invoice_service_date">Date of Service: {invoice.service_date}</div>
                <div className="invoice_teacher">Teacher: {invoice?.teacher?.full_name}</div>
                <div className="invoice_students">Student: {invoice?.student?.full_name}</div>
                <div className="invoice_amount">Amount: {invoice.amount}</div>
                <div className="invoice_comments">Comments: {invoice.comment}</div>
            </section>
        </article>
    )
}