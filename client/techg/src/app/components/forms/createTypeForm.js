'use client'

import { createType, fetchCategories } from "@/app/http/ProductAPI"
import { useEffect, useState } from "react"

const CreateTypeForm = ({ onHide, fetchTypes}) => {
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories()
        .then(data => {
            setCategories(data.rows)
        })
    }, [])

    const addType = async () => {
        try {
            await createType({name, categoryId})
            fetchTypes()
            alert('Type added successfully!')
            onHide()
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()}
            className="flex gap-5">
            <input placeholder="Type name"
                className="px-3 py-1 border border-brand rounded"
                onChange={e => setName(e.target.value)} />
            <select onChange={e => setCategoryId(e.target.value)}
                defaultValue={() => {
                    try{return categories[0].id}catch{return 0}
                    }}>
                {
                    categories.map(category => {
                        return (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        )
                    })
                }
            </select>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={addType}>
                Add
            </button>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={onHide}>
                Cancel
            </button>
        </form> 
    )
}

export default CreateTypeForm