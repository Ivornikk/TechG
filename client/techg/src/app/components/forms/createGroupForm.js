'use client'

import { useEffect, useState } from "react"
import { createGroup, fetchTypes } from "@/app/http/ProductAPI"

const CreateGroupForm = ({onHide, fetchGroups}) => {
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState(0)
    const [types, setTypes] = useState([])

    useEffect(() => {
        fetchTypes()
        .then(data => {
            setTypes(data.rows)
        })
    }, [])

    const addGroup = async () => {
        try {
            await createGroup({name, typeId})
            fetchGroups()
            alert('Group added successfully!')
            onHide()
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()}
            className="flex gap-5 h-[50%]">
            <input placeholder="Group name"
                className="px-3 py-1 border border-brand rounded"
                onChange={e => setName(e.target.value)} />
            <select onChange={e => setTypeId(e.target.value)}>
                {
                    types.map(type => {
                        return (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        )
                    })
                }
            </select>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={addGroup}>
                Add
            </button>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={onHide}>
                Cancel
            </button>
        </form> 
    )
}

export default CreateGroupForm