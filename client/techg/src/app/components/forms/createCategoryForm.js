'use client'

import { createCategory } from "@/app/http/ProductAPI"
import { useState } from 'react'
const CreateCategoryForm = ({onHide, fetchCategories}) => {
    const [name, setName] = useState('')

    const addCategory = async () => {
        try {
            await createCategory(name)
            fetchCategories()
            alert('Category added successfully!')
            onHide()
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()}
            className="flex gap-5 h-[50%]">
            <input placeholder="Category name"
                className="px-3 py-1 border border-brand rounded"
                onChange={e => setName(e.target.value)} />
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={addCategory}>
                Add
            </button>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={onHide}>
                Cancel
            </button>
        </form> 
    )
}

export default CreateCategoryForm