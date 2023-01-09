import React, { useEffect } from "react"
import { useState } from "react"
import { createResource, deleteResource, getResources } from "../managers/ResourceManager"
import { useParams } from "react-router-dom"
import { getSingleTeacher } from "../managers/TeacherManager"
import { Card, Image, Button, Group, TextInput } from "@mantine/core"
import { Link } from "react-router-dom"
import "./ResourceList.css"


export const ResourceList = () => {
    const [resources, setResources] = useState([])
    const [teacher, setTeacher] = useState({})
    const localSM = localStorage.getItem("sm_token")
    const SMTokenObject = JSON.parse(localSM)
    const [showForm, setShowForm] = useState(false)
    const { teacherId } = useParams()
    const [newResource, setNewResource] = useState({
        resource: "",
        img: "",
        name: "",
        teacher: teacherId
    })



    useEffect(() => {
        getResources(teacherId).then(data => setResources(data))
    }, [])

    useEffect(() => {
        getSingleTeacher(teacherId).then(data => setTeacher(data))
    }, [])


    const changeResourceState = (domEvent) => {
        const resource = Object.assign({}, newResource)
        resource[domEvent.target.name] = domEvent.target.value
        setNewResource(resource)
    }






    return (
        <article className="resourceBody">
            <h1>{teacher.full_name}'s Resources:</h1>
            <Group position="center" className="resourceBoxes">
                {
                    resources.map(resource => {
                        return <Card shadow="lg" px={20} p="lg" radius="lg" withBorder>
                            <div className="resourceLabel">
                                <a className="text" target="_blank" href={resource.resource}>
                                    <Image src={resource.img} className="resource_img" style={{ width: '80px', height: '120px' }} />
                                    {resource.name}
                                </a>
                                {
                                    SMTokenObject.is_staff === true
                                        ?

                                        <Button
                                            className="resourceButton"
                                            variant="filled"
                                            color="orangy"
                                            radius={20} onClick={
                                                () => {
                                                    deleteResource(resource.id).then(() => window.location.reload())
                                                }
                                            }>Delete</Button>

                                        :
                                        ""
                                }
                            </div>
                        </Card>
                    })
                }
            </Group>
            {
                SMTokenObject.is_staff === true
                    ?

                    <Button
                        className="expandButton"
                        variant="light"
                        color="orangy"
                        radius={20}
                        onClick={() => setShowForm(!showForm)}>Add New Resource</Button>

                    :
                    ""
            }
            {
                showForm
                    ?
                    <div style={{
                        width: 600, marginLeft: 'auto', marginRight: 'auto'
                    }}>
                        <Card className="newResourceForm" shadow="sm" px={30} p="md" radius="lg" withBorder>
                            <h2>New Resource</h2>
                            <TextInput label="Resource Name:" type="text" name="name" required autoFocus className="form-control"
                                value={newResource.name}
                                onChange={changeResourceState}
                            />
                            <TextInput label="Resource URL:" type="resource" name="resource" required autoFocus className="form-control"
                                value={newResource.resource}
                                onChange={changeResourceState}
                            />
                            <TextInput label="Image:" type="text" name="img" required autoFocus className="form-control"
                                value={newResource.img}
                                onChange={changeResourceState}
                            />
                            <div className="buttonSection">
                                <Button
                                    variant="light"
                                    color="orangy"
                                    radius={20} type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()

                                        const resource = {
                                            resource: newResource.resource,
                                            img: newResource.img,
                                            name: newResource.name,
                                            teacher: parseInt(teacherId)
                                        }

                                        createResource(resource)
                                            .then(() => window.location.reload())
                                    }}
                                    className="createButton">Create</Button>
                            </div>
                        </Card >
                    </div >
                    :
                    ""
            }
        </article >
    )
}