import { Card, Badge, Image, Button } from "@mantine/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getInvoice } from "../managers/InvoiceManager"
import { Link } from "react-router-dom"
import { IconCurrencyDollar } from "@tabler/icons"
import "./InvoiceList.css"


export const InvoiceProfile = () => {
    const [invoice, setInvoice] = useState([])
    const { invoiceId } = useParams()
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)

    useEffect(() => {
        getInvoice(invoiceId).then(data => setInvoice(data))
    }, [])

    const updateInvoice = (invoice) => {
        return fetch(`http://localhost:8000/invoices/${invoice.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${SMTokenObject.token}`,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(invoice)
        })
    }

    return (
        <div className="insteadOfNav" style={{
            width: 700, marginLeft: 'auto', marginRight: 'auto'
        }}>
            <Card shadow="sm" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    {
                        SMTokenObject.is_staff === true
                            ?
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
                            :
                            <Link to={`/myStudentProfile`}>
                                <Image
                                    radius={100}
                                    height={100}
                                    width="auto"
                                    src={invoice?.student?.img}
                                    alt="Student"
                                    fit="contain"
                                />
                            </Link>
                    }
                    <div style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h1 className="assignmentTitle" mt="lg" color="dark" size="" weight={700}>{invoice?.student?.full_name}'s Invoice</h1>
                        <div className="badgeSection">
                            <Badge
                                className="invoiceBadge"
                                size="lg"
                                color="orangy"
                                variant="dark"
                                radius={30} >
                                Date: {invoice.date_created}
                            </Badge>
                            {
                                invoice.paid === true
                                    ?
                                    <Button
                                        className="invoiceBadge"
                                        size="sm"
                                        color="orangy"
                                        variant="light"
                                        radius={30}>
                                        <IconCurrencyDollar />
                                        Paid
                                    </Button>
                                    :
                                    ""
                            }
                        </div>
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
                {
                    SMTokenObject.is_staff === true
                        ?
                        <Button variant="light"
                            color="green"
                            radius={20}
                            type="submit"
                            onClick={evt => {
                                evt.preventDefault()

                                const paidInvoice = {
                                    paid: true,
                                    id: invoice.id
                                }

                                updateInvoice(paidInvoice)
                                    .then(() => window.location.reload())
                            }}
                            className="lessonSubmit">
                            <IconCurrencyDollar />
                            I've Been Paid
                            <IconCurrencyDollar />
                        </Button>
                        :
                        ""
                }

            </Card>
        </div>
    )
}

