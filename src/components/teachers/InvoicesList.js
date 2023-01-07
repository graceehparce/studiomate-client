import { Card, Image, Button } from "@mantine/core"
import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getInvoices } from "../managers/InvoiceManager"
import { getStudent } from "../managers/StudentManager"
import "./InvoiceList.css"
import { IconCurrencyDollar } from "@tabler/icons"


export const InvoicesList = () => {
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [invoices, setInvoices] = useState([])
    const [student, setStudent] = useState({})
    const { studentId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInvoices(studentId).then(data => setInvoices(data))
    }, [])

    useEffect(() => {
        getStudent(studentId).then(data => setStudent(data))
    }, [])



    return (
        <div className="insteadOfNav" style={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <Card shadow="lg" px={30} p="md" radius="lg" withBorder>
                <Card.Section shadow="sm" px={30} p="md" radius="lg" withBorder>
                    <div className="invoicePicBox" style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        {
                            SMTokenObject.is_staff === true
                                ?
                                <Link to={`/students/${student.id}`}>
                                    <Image
                                        radius={100}
                                        height={100}
                                        width="auto"
                                        src={student.img}
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
                                        src={student.img}
                                        alt="Student"
                                        fit="contain"
                                    />
                                </Link>
                        }
                        <h2 className="invoiceListHeading">{student.full_name}'s Invoices</h2>
                        {
                            SMTokenObject.is_staff === true
                                ?

                                <Button
                                    variant="light"
                                    color="orangy"
                                    radius={20}
                                    onClick={() => {
                                        navigate({ pathname: `/invoiceForm/${studentId}` })
                                    }}>Create New Invoice</Button>
                                :
                                ""
                        }
                    </div>

                </Card.Section>
                <div className="listSection">
                    {
                        invoices.map(invoice => {
                            if (invoice.paid === true) {
                                return <section key={`assignment--${invoice.id}`} className="invoice">
                                    <Button
                                        className="buttonList"
                                        variant="outline"
                                        color="green"
                                        radius={20}
                                        onClick={() => {
                                            navigate({ pathname: `/invoice/${invoice.id}` })
                                        }}>
                                        <IconCurrencyDollar />
                                        Invoice {invoice.date_created}</Button>
                                </section>
                            }
                            else {
                                return <section key={`assignment--${invoice.id}`} className="invoice">
                                    <Button
                                        className="buttonList"
                                        variant="dark"
                                        color="orangy"
                                        radius={20}
                                        onClick={() => {
                                            navigate({ pathname: `/invoice/${invoice.id}` })
                                        }}>
                                        Invoice {invoice.date_created}</Button>
                                </section>
                            }
                        })
                    }
                </div>
            </Card >
        </div>
    )
}


