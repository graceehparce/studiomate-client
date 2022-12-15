import React, { useEffect } from "react"
import { useState } from "react"
import { createResource, deleteResource, getResources } from "../managers/ResourceManager"
import { useParams } from "react-router-dom"
import { getSingleTeacher } from "../managers/TeacherManager"

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
        <article>
            <h1>{teacher.full_name}'s Resources:</h1>
            {
                resources.map(resource => {
                    return <section key={`resource--${resource.id}`} className="resource">
                        <div className="resource">
                            <img src={resource.img} alt="" className="resource_img" style={{ width: '200px', height: '300px' }} />
                            <a className="text" target="_blank" href={resource.resource}>{resource.name}</a>
                            <button onClick={
                                () => {
                                    deleteResource(resource.id).then(() => window.location.reload())
                                }
                            }>Delete</button>
                        </div>


                    </section>
                })
            }
            {
                SMTokenObject.is_staff === true
                    ?

                    <button onClick={() => setShowForm(!showForm)}>Add New Resource</button>

                    :
                    ""
            }
            {
                showForm
                    ?
                    <form>
                        <h2>New Resource</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="name">Resource Name: </label>
                                <input type="text" name="name" required autoFocus className="form-control"
                                    value={newResource.name}
                                    onChange={changeResourceState}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="resource">Resource URL: </label>
                                <input type="resource" name="resource" required autoFocus className="form-control"
                                    value={newResource.resource}
                                    onChange={changeResourceState}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="img">Image: </label>
                                <input type="text" name="img" required autoFocus className="form-control"
                                    value={newResource.img}
                                    onChange={changeResourceState}
                                />
                            </div>
                        </fieldset>
                        <button type="submit"
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
                            className="btn btn-primary">Create</button>
                    </form >
                    :
                    ""
            }
        </article>
    )
}