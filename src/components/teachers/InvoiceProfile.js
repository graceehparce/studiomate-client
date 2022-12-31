import { Card, Badge, Image } from "@mantine/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getInvoice } from "../managers/InvoiceManager"
import { Link } from "react-router-dom"


export const InvoiceProfile = () => {
    const [invoice, setInvoice] = useState([])
    const { invoiceId } = useParams()

    useEffect(() => {
        getInvoice(invoiceId).then(data => setInvoice(data))
    }, [])

    return (
        <div style={{
            width: 700, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <Link to={`/students/${invoice?.student?.id}`}>
                        <Image
                            radius={100}
                            height={100}
                            width="auto"
                            src={invoice?.student?.img}
                            alt="Student"
                            fit="contain"
                        />
                    </Link>
                    <div style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h1 className="assignmentTitle" mt="lg" color="dark" size="" weight={700}>{invoice?.student?.full_name}'s Invoice</h1>
                        <Badge
                            size="lg"
                            color="orangy"
                            variant="light"
                            radius={30} >
                            Date: {invoice.date_created}
                        </Badge>
                    </div>
                </Card.Section>
                <div className="category">Date of Service: </div>
                <div className="response">{invoice.service_date}</div>
                <div className="category">Teacher: </div>
                <div className="response">{invoice?.teacher?.full_name}</div>
                <div className="category">Student: </div>
                <div className="response">{invoice?.student?.full_name}</div>
                <div className="category">Amount: </div>
                <div className="response">{invoice.amount}</div>
                <div className="category">Comments: </div>
                <div className="response">{invoice.comment}</div>
            </Card>
        </div>
    )
}

