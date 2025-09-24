'use client'

import { editProduct, fetchGroups } from "@/app/http/ProductAPI"

const { StoreContext } = require("@/app/store/StoreProvider")
const { observer } = require("mobx-react-lite")
const { useContext, useState, useEffect } = require("react")

const EditProductForm = observer(({productId, onHide}) => {

    const { product } = useContext(StoreContext)

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDesc, setProductDesc] = useState('')

    useEffect(() => {
        fetchGroups()
        .then(data => {
            product.setGroups(data.rows)
        })
    }, [])

    const submit = async () => {
        const formData = new FormData()

        formData.append('title', productName)
        formData.append('price', productPrice)
        formData.append('description', productDesc)

        editProduct({inputData: formData, id: productId})
        onHide()
    }

    return (
        <form className="h-50 flex gap-10 items-center"
            onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-3">
                <input className="px-5 py-3 border border-brand rounded"
                    placeholder="Product name" 
                    onChange={e => setProductName(e.target.value)} />
                <input className="px-5 py-3 border border-brand rounded"
                    placeholder="Product price"
                    onChange={e => setProductPrice(e.target.value)} />
                <input className="px-5 py-3 border border-brand rounded"
                    placeholder="Product description"
                    onChange={e => setProductDesc(e.target.value)} />
            </div>
            <div className="flex flex-col gap-5">
                <button className="px-5 py-2 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                    onClick={submit}>
                    Edit
                </button>
                <button className="px-5 py-2 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                    onClick={onHide}>
                    Cancel
                </button>
            </div>
        </form>
    )
})

export default EditProductForm